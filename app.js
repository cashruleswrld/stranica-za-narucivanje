// Zajednički kod: Firebase (baza + prijava) i registracija aplikacije (PWA)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, deleteDoc, writeBatch, getDocs, query, where, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, reauthenticateWithCredential, EmailAuthProvider, deleteUser, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { FIREBASE, SALON } from './postavke.js';

const app = initializeApp(FIREBASE);
const db = getFirestore(app);
const auth = getAuth(app);

// Postavke koje vlasnik mijenja sam u admin.html ("Postavke salona") spremaju se u bazu (postavke/salon)
// i prepisuju zadane vrijednosti iz postavke.js. Zadnje učitane pamte se u pregledniku za slučaj da nema interneta.
const UREDIVO = ['naziv', 'telefon', 'adresa', 'instagram', 'radnoVrijeme', 'blagdani', 'neradniDani', 'usluge'];
const ZADANO = JSON.parse(JSON.stringify(Object.fromEntries(UREDIVO.map(k => [k, SALON[k]]))));
const KLJUC = 'postavkeSalona_' + FIREBASE.projectId;
function primijeniPostavke(p) {
  UREDIVO.forEach(k => { SALON[k] = p && p[k] !== undefined ? p[k] : JSON.parse(JSON.stringify(ZADANO[k])); });
}
try { primijeniPostavke(JSON.parse(localStorage.getItem(KLJUC))); } catch {}
try {
  const d = await Promise.race([getDoc(doc(db, 'postavke', 'salon')), new Promise((_, ne) => setTimeout(ne, 4000))]);
  const p = d.exists() ? d.data() : null;
  primijeniPostavke(p);
  try { localStorage.setItem(KLJUC, JSON.stringify(p)); } catch {}
} catch {}

export const Postavke = {
  zadano: () => JSON.parse(JSON.stringify(ZADANO)),
  // Samo vlasnik salona (pravila baze); nakon spremanja odmah vrijedi i na ovom uređaju
  async spremi(p) {
    const podaci = Object.fromEntries(UREDIVO.map(k => [k, p[k]]));
    await setDoc(doc(db, 'postavke', 'salon'), podaci);
    primijeniPostavke(podaci);
    try { localStorage.setItem(KLJUC, JSON.stringify(podaci)); } catch {}
  }
};

// "slots" = javno vidljivi zauzeti sati (bez imena), "termini" = pravi podaci (vidi ih samo vlasnik salona i klijent),
// "dnevno" = oznaka {uid}_{datum} koja sprječava da jedna osoba ima više od jednog termina u danu (ako je SALON.jedanTerminDnevno)
const dnevnoId = (uid, datum) => `${uid}_${datum}`;
const lista = s => s.docs.map(d => ({ id: d.id, ...d.data() }));
export const Store = {
  async takenOn(datum) {
    const s = await getDocs(query(collection(db, 'slots'), where('datum', '==', datum)));
    return new Set(s.docs.map(d => d.data().vrijeme));
  },
  async add(t) {
    if (!auth.currentUser) throw new Error('Nisi prijavljen');
    const uid = auth.currentUser.uid; // termin je uvijek vezan uz račun
    const id = `${t.datum}_${t.vrijeme}`;
    const b = writeBatch(db);
    b.set(doc(db, 'slots', id), { datum: t.datum, vrijeme: t.vrijeme });
    if (SALON.jedanTerminDnevno) b.set(doc(db, 'dnevno', dnevnoId(uid, t.datum)), { uid, datum: t.datum });
    b.set(doc(db, 'termini', id), { ...t, uid, created: serverTimestamp() });
    await b.commit(); // ako je sat zauzet ili osoba taj dan već ima termin, cijela operacija ne uspije
  },
  // Vlasnik salona sam upisuje termin (npr. klijent je nazvao) – bez računa klijenta
  async dodajRucno(t) {
    const id = `${t.datum}_${t.vrijeme}`;
    const b = writeBatch(db);
    b.set(doc(db, 'slots', id), { datum: t.datum, vrijeme: t.vrijeme });
    b.set(doc(db, 'termini', id), { ...t, rucno: true, created: serverTimestamp() });
    await b.commit(); // ne uspije ako je sat već zauzet
  },
  // Vlasnik salona: termini od..do (npr. jedan mjesec), da se ne učitava cijela povijest odjednom
  async razdoblje(od, doDatuma) {
    return lista(await getDocs(query(collection(db, 'termini'), where('datum', '>=', od), where('datum', '<=', doDatuma))));
  },
  // Svi termini jedne osobe (klijent svoje, vlasnik salona bilo čije)
  async mine(uid) {
    return lista(await getDocs(query(collection(db, 'termini'), where('uid', '==', uid))));
  },
  // Propušteni termini koji još nisu plaćeni
  async dugovi(uid) {
    const s = await getDocs(query(collection(db, 'termini'), where('uid', '==', uid), where('nijeDosao', '==', true)));
    return lista(s).filter(t => !t.podmireno);
  },
  // Otkaz manje od ROK_OTKAZA sati prije termina: sat se oslobađa, a termin ostaje zapisan kao dug (termini/{id}_k)
  async otkaziKasno(t) {
    const { id, ...podaci } = t;
    const b = writeBatch(db);
    b.delete(doc(db, 'slots', id));
    b.delete(doc(db, 'termini', id));
    b.delete(doc(db, 'dnevno', dnevnoId(t.uid, t.datum)));
    b.set(doc(db, 'termini', id + '_k'), { ...podaci, otkazanKasno: true, nijeDosao: true, podmireno: false });
    await b.commit();
  },
  // Vlasnik salona: oznaka "nije došao" / "platio"
  oznaci: (id, polja) => updateDoc(doc(db, 'termini', id), polja),
  async remove(t) {
    const b = writeBatch(db);
    b.delete(doc(db, 'slots', t.id));
    b.delete(doc(db, 'termini', t.id));
    if (t.uid) b.delete(doc(db, 'dnevno', dnevnoId(t.uid, t.datum)));
    await b.commit();
  }
};

// Koliko je sati do termina (negativno ako je prošao)
export const satiDo = t => (new Date(`${t.datum}T${t.vrijeme}`) - new Date()) / 36e5;
export const ROK_OTKAZA = SALON.rokOtkaza; // sati

// Usluga se uz termin sprema s cijenom, npr. "Šišanje (20 €)", pa stari termini pamte staru cijenu
export const vrijednostUsluge = u => `${u.hr} (${u.cijena} €)`;
export const nadjiUslugu = v => SALON.usluge.find(u => u.hr === String(v || '').replace(/\s*\(.*\)$/, ''));
// Cijena iz spremljenog naziva usluge, npr. "Šišanje (20 €)" -> 20
export const cijena = usluga => +((String(usluga || '').match(/\((\d+)\s*€\)/) || [])[1] || 0);

// Provjera broja mobitela: hrvatski mobitel (091 234 5678, +385 91 234 5678) ili inozemni (+43 ...)
// Vraća očišćen broj ili null ako nije pravi broj
// Radno vrijeme: ključevi u postavkama po danu u tjednu (getDay(): 0 = nedjelja)
export const DANI = ['ned', 'pon', 'uto', 'sri', 'cet', 'pet', 'sub'];
const uMinute = s => +s.slice(0, 2) * 60 + +s.slice(3, 5);
const uSat = m => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');

// Hrvatski blagdani (uključujući Uskrsni ponedjeljak i Tijelovo, koji se mijenjaju svake godine)
function uskrs(g) { // gregorijanski Uskrs (Meeus/Jones/Butcher)
  const a = g % 19, b = Math.floor(g / 100), c = g % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25),
    h = (19 * a + b - d - Math.floor((b - f + 1) / 3) + 15) % 30, i = Math.floor(c / 4), k = c % 4,
    l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
    mj = Math.floor((h + l - 7 * m + 114) / 31), dan = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(g, mj - 1, dan);
}
const uDatum = d => d.toLocaleDateString('sv-SE');
export function blagdan(datum) {
  const g = +datum.slice(0, 4), md = datum.slice(5);
  if (['01-01', '01-06', '05-01', '05-30', '06-22', '08-05', '08-15', '11-01', '11-18', '12-25', '12-26'].includes(md)) return true;
  const u = uskrs(g), plus = n => uDatum(new Date(u.getFullYear(), u.getMonth(), u.getDate() + n));
  return [plus(0), plus(1), plus(60)].includes(datum); // Uskrs, Uskrsni ponedjeljak, Tijelovo
}
const zatvoreno = datum => (SALON.blagdani && blagdan(datum)) || (SALON.neradniDani || []).includes(datum);
export const radiDan = datum => !zatvoreno(datum) && !!SALON.radnoVrijeme[DANI[new Date(datum + 'T00:00').getDay()]];
// Svi početci termina u danu, npr. 09:00, 09:30 … (zadnji završava kad salon zatvara).
// sviDani = true: vlasnik smije upisati termin i na blagdan / neradni datum (ako je to inače radni dan u tjednu)
export function satiZaDan(datum, sviDani = false) {
  const r = SALON.radnoVrijeme[DANI[new Date(datum + 'T00:00').getDay()]];
  if (!r || (!sviDani && zatvoreno(datum))) return [];
  const sati = [];
  for (let m = uMinute(r[0]); m + SALON.trajanjeTermina <= uMinute(r[1]); m += SALON.trajanjeTermina) sati.push(uSat(m));
  return sati;
}

export function provjeriTel(v) {
  let t = String(v || '').trim().replace(/[\s\-\/().]/g, '');
  if (t.startsWith('00')) t = '+' + t.slice(2);
  if (/^\+385\d+$/.test(t)) t = '0' + t.slice(4);
  if (/^09[1-9]\d{6,7}$/.test(t)) return t;
  if (/^\+[1-9]\d{7,14}$/.test(t)) return t;
  return null;
}

// Osobni podaci klijenta (ime, mobitel) – vidi i mijenja ih samo vlasnik računa
export const Profil = {
  async get(uid) {
    const d = await getDoc(doc(db, 'korisnici', uid));
    return d.exists() ? d.data() : null;
  },
  // Novo ime/mobitel upisuje se i u već zakazane (buduće) termine, da ih salon vidi
  async set(user, ime, tel) {
    await updateProfile(user, { displayName: ime });
    await setDoc(doc(db, 'korisnici', user.uid), { ime, tel });
    const danas = new Date().toLocaleDateString('sv-SE');
    const buduci = (await Store.mine(user.uid)).filter(t => t.datum >= danas && !t.otkazanKasno && (t.ime !== ime || t.tel !== tel));
    if (!buduci.length) return;
    const b = writeBatch(db);
    buduci.forEach(t => b.update(doc(db, 'termini', t.id), { ime, tel }));
    await b.commit();
  }
};

export const Auth = {
  login: (email, lozinka) => signInWithEmailAndPassword(auth, email, lozinka),
  register: async (email, lozinka, ime, tel) => {
    const c = await createUserWithEmailAndPassword(auth, email, lozinka);
    await Profil.set(c.user, ime, tel);
    return c;
  },
  user: () => auth.currentUser,
  // Briše termine, osobne podatke i sam račun (traži lozinku radi sigurnosti)
  obrisiRacun: async (lozinka) => {
    const u = auth.currentUser;
    await reauthenticateWithCredential(u, EmailAuthProvider.credential(u.email, lozinka));
    const moji = await Store.mine(u.uid);
    const greska = code => { const e = new Error(code); e.code = code; throw e; };
    if (moji.some(t => t.nijeDosao && !t.podmireno)) greska('dug');
    // Termini od prije 2 dana do ROK_OTKAZA sati unaprijed ne mogu se obrisati (salon još može označiti nedolazak)
    if (moji.some(t => !t.otkazanKasno && satiDo(t) > -50 && satiDo(t) <= ROK_OTKAZA)) greska('blizu');
    for (const t of moji) await Store.remove(t);
    await deleteDoc(doc(db, 'korisnici', u.uid));
    await deleteUser(u);
  },
  reset: (email) => {
    try { auth.languageCode = localStorage.getItem('jezik') || 'hr'; } catch { auth.languageCode = 'hr'; } // email na jeziku aplikacije
    return sendPasswordResetEmail(auth, email);
  },
  logout: () => signOut(auth),
  onChange: cb => onAuthStateChanged(auth, cb)
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
