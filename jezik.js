// Prijevodi (hr / en) i prebacivanje jezika. Odabrani jezik pamti se u pregledniku.
// {naziv} i {h} se u svim tekstovima popunjavaju iz postavke.js
import { SALON } from './postavke.js';
import './app.js'; // prvo se učitaju postavke salona iz baze (naziv, adresa…)

const R = {
  hr: {
    title_app: '{naziv}', tab_pocetna: 'Početna', tab_usluge: 'Usluge', tab_termini: 'Termini', tab_postavke: 'Postavke',
    prijava: 'Prijava', registracija: 'Registracija', naruci: 'Naruči termin',
    posjeti: 'Posjeti nas', otvori_kartu: 'Otvori u kartama', radno_h: 'Radno vrijeme',
    r_zatvoreno: 'Zatvoreno',
    usluge_h: 'Usluge i cijene',
    termini_h: 'Moji termini', tab_buduci: 'Budući', tab_prosli: 'Prošli',
    nema_buducih: 'Trenutno nemate rezervacija.', nema_proslih: 'Nemate prošlih termina.',
    termini_prijava: 'Prijavi se da vidiš svoje termine.', ne_mogu: 'Ne mogu učitati termine.',
    otkazi: 'Otkaži', potvrdi_otkaz: 'Otkazati termin {d} u {v}?', u_vrijeme: '{d} u {v}',
    postavke_h: 'Postavke', p_profil: 'Korisnički profil', p_racun: 'Moj račun', p_oapp: 'O aplikaciji', p_odjava: 'Odjavi me', p_obrisi: 'Obriši račun',
    potvrdi_odjavu: 'Sigurno se želiš odjaviti?',
    natrag: 'Natrag', lbl_ime: 'Ime', lbl_tel: 'Broj mobitela', spremi: 'Spremi promjene', podaci_ok: 'Podaci su spremljeni.',
    spremanje_greska: 'Spremanje nije uspjelo, pokušaj ponovno.',
    lbl_email: 'Email', promijeni_lozinku: 'Pošalji link za novu lozinku', racun_info: 'Poslat ćemo ti email s linkom za postavljanje nove lozinke.',
    oapp_tekst: '{naziv} – online naručivanje termina. Prijavi se, odaberi uslugu, dan i sat, a svoje termine uvijek možeš pregledati i otkazati.',
    oapp_kontakt: 'Za personalizirane aplikacije molimo kontaktirajte nas na WhatsApp ili Instagram.',
    prijavi_se: 'Prijavi se', napravi_racun: 'Napravi račun', registracija_h: 'Registracija',
    lbl_lozinka: 'Lozinka', lbl_lozinka6: 'Lozinka (min. 6 znakova)', lbl_lozinka2: 'Ponovi lozinku', zaboravljena: 'Zaboravljena lozinka',
    e_razlicite: 'Lozinke se ne podudaraju.', e_postoji: 'Račun s tim emailom već postoji, prijavi se.', e_slaba: 'Lozinka mora imati barem 6 znakova.',
    e_email: 'Email nije ispravan.', e_login: 'Pogrešan email ili lozinka.', e_ime: 'Upiši ime.',
    e_email_prvo: 'Upiši email pa klikni ponovno.', reset_ok: 'Poslali smo link za novu lozinku na {x}', reset_err: 'Ne mogu poslati email, provjeri adresu.',
    narudzba_h: 'Naruči termin', lbl_usluga: 'Usluga', opt_usluga: 'Odaberi uslugu', lbl_datum: 'Datum', lbl_vrijeme: 'Vrijeme',
    lbl_napomena: 'Napomena (neobavezno)', potvrdi: 'Potvrdi narudžbu',
    m_prvo_datum: 'Prvo odaberi datum', m_odaberi_sat: 'Odaberi sat',     m_nema: 'Nema slobodnih termina za taj dan.', m_greska_ucit: 'Ne mogu učitati termine, pokušaj ponovno.',
    m_tel: 'Upiši pravi broj mobitela, npr. 091 234 5678.', m_hvala: 'Hvala, {ime}! Termin: {d} u {v}.',
    m_zauzet: 'Taj termin je zauzet ili je došlo do greške, odaberi drugi.',
    ucitavam: 'Učitavam…',
    m_jedan_dnevno: 'Taj dan već imaš termin. Moguć je jedan termin u danu.',
    m_max_buducih: 'Već imaš {n} rezervirana termina. Novi možeš rezervirati kad jedan prođe ili ga otkažeš.',
    dug_info: 'Imaš neplaćen termin (propušten ili kasno otkazan): {d}. Kod ovog dolaska plaćaš i njega ({x} €).',
    ukupno: 'ukupno {x} €', nisi_dosao: 'Propušten · nije plaćeno', nisi_dosao_placeno: 'Propušten · plaćeno',
    kasno_otkazano: 'Kasno otkazano · nije plaćeno', kasno_otkazano_placeno: 'Kasno otkazano · plaćeno',
    kasno_upozorenje: 'Do termina je manje od {h} sati. Ako sada otkažeš termin ili se ne pojaviš, moraš platiti punu cijenu ovog termina ({x} €)!',
    otkaz_greska: 'Otkazivanje nije uspjelo, pokušaj ponovno.',
    brisanje_blizu: 'Račun možeš obrisati tek 2 dana nakon zadnjeg termina. Ako imaš termin u sljedećih {h} sati, prvo ga otkaži.',
    pravilo_dolazak: 'Termin otkaži najkasnije {h} sati prije. Ako otkažeš kasnije ili ne dođeš, kod sljedećeg dolaska plaćaš i taj termin.',
    brisanje_dug: 'Račun se ne može obrisati dok propušteni termin nije plaćen. Javi se salonu.',
    obrisi_info: 'Brisanjem se trajno brišu tvoj račun, osobni podaci i svi tvoji termini. Ovo se ne može poništiti.',
    lozinka_potvrda: 'Lozinka (za potvrdu)', obrisi_gumb: 'Trajno obriši račun', odustani: 'Odustani',
    potvrdi_brisanje: 'Sigurno želiš trajno obrisati račun i sve svoje termine?', racun_obrisan: 'Račun je obrisan.',
    kriva_lozinka: 'Pogrešna lozinka.', brisanje_greska: 'Brisanje nije uspjelo, pokušaj ponovno.',
    p_privatnost: 'Pravila privatnosti', pristanak: 'Prihvaćam', pravila_privatnosti_link: 'pravila privatnosti',
    e_pristanak: 'Za registraciju trebaš prihvatiti pravila privatnosti.',
    pv_h1: 'Tko obrađuje tvoje podatke', pv_t1: 'Voditelj obrade osobnih podataka je {naziv}, {adresa}, tel. {telefon}. Aplikacija služi isključivo za naručivanje termina u tom salonu.',
    pv_h2: 'Koje podatke prikupljamo', pv_t2: 'Ime, broj mobitela i email adresu koje upišeš pri registraciji, te podatke o tvojim terminima: datum, vrijeme, uslugu, napomenu i evidenciju dolazaka, nedolazaka i neplaćenih termina.',
    pv_h3: 'Zašto ih prikupljamo', pv_t3: 'Kako bi mogao/la rezervirati, pregledati i otkazati termin, a salon te mogao kontaktirati u vezi termina. Pravna osnova je izvršenje usluge koju si zatražio/la te legitimni interes salona da vodi evidenciju termina i nedolazaka.',
    pv_h4: 'Gdje se podaci čuvaju i tko ih vidi', pv_t4: 'Podaci se čuvaju u usluzi Google Firebase. Tvoje termine i podatke vidiš samo ti i salon. Podaci se ne prodaju i ne dijele s drugima u marketinške svrhe.',
    pv_h5: 'Koliko dugo', pv_t5: 'Dok imaš račun. Kad obrišeš račun (Postavke → Obriši račun), trajno se brišu račun, osobni podaci i svi termini. Ako postoji neplaćeni propušteni termin, račun se može obrisati tek kad se on podmiri.',
    pv_h6: 'Tvoja prava', pv_t6: 'Imaš pravo na uvid u svoje podatke, ispravak (Postavke → Korisnički profil), brisanje i prigovor. Za sve upite javi se salonu. Ako smatraš da se tvoji podaci obrađuju nezakonito, možeš podnijeti pritužbu Agenciji za zaštitu osobnih podataka (azop.hr).',
    pv_h7: 'Kolačići', pv_t7: 'Aplikacija ne koristi kolačiće za praćenje ni oglase. U pregledniku se pamte samo odabrani jezik i prijava u račun.'
  },
  en: {
    title_app: '{naziv}', tab_pocetna: 'Home', tab_usluge: 'Services', tab_termini: 'Appointments', tab_postavke: 'Settings',
    prijava: 'Log in', registracija: 'Sign up', naruci: 'Book appointment',
    posjeti: 'Visit us', otvori_kartu: 'Open in Maps', radno_h: 'Opening hours',
    r_zatvoreno: 'Closed',
    usluge_h: 'Services & prices',
    termini_h: 'My appointments', tab_buduci: 'Upcoming', tab_prosli: 'Past',
    nema_buducih: 'You have no bookings right now.', nema_proslih: 'You have no past appointments.',
    termini_prijava: 'Log in to see your appointments.', ne_mogu: "Couldn't load appointments.",
    otkazi: 'Cancel', potvrdi_otkaz: 'Cancel the appointment on {d} at {v}?', u_vrijeme: '{d} at {v}',
    postavke_h: 'Settings', p_profil: 'User profile', p_racun: 'My account', p_oapp: 'About the app', p_odjava: 'Log me out', p_obrisi: 'Delete account',
    potvrdi_odjavu: 'Are you sure you want to log out?',
    natrag: 'Back', lbl_ime: 'Name', lbl_tel: 'Mobile number', spremi: 'Save changes', podaci_ok: 'Details saved.',
    spremanje_greska: 'Saving failed, please try again.',
    lbl_email: 'Email', promijeni_lozinku: 'Send password reset link', racun_info: "We'll email you a link to set a new password.",
    oapp_tekst: '{naziv} – online booking. Log in, choose a service, a day and a time, and you can always review or cancel your appointments.',
    oapp_kontakt: 'For a custom app of your own, contact us on WhatsApp or Instagram.',
    prijavi_se: 'Log in', napravi_racun: 'Create account', registracija_h: 'Sign up',
    lbl_lozinka: 'Password', lbl_lozinka6: 'Password (min. 6 characters)', lbl_lozinka2: 'Repeat password', zaboravljena: 'Forgot password',
    e_razlicite: 'Passwords do not match.', e_postoji: 'An account with this email already exists, please log in.', e_slaba: 'Password must be at least 6 characters.',
    e_email: 'Invalid email.', e_login: 'Wrong email or password.', e_ime: 'Enter your name.',
    e_email_prvo: 'Enter your email and click again.', reset_ok: "We've sent a password reset link to {x}", reset_err: "Couldn't send the email, check the address.",
    narudzba_h: 'Book an appointment', lbl_usluga: 'Service', opt_usluga: 'Choose a service', lbl_datum: 'Date', lbl_vrijeme: 'Time',
    lbl_napomena: 'Note (optional)', potvrdi: 'Confirm booking',
    m_prvo_datum: 'Choose a date first', m_odaberi_sat: 'Choose a time',     m_nema: 'No free appointments on that day.', m_greska_ucit: "Couldn't load appointments, please try again.",
    m_tel: 'Enter a valid mobile number, e.g. 091 234 5678.', m_hvala: 'Thank you, {ime}! Appointment: {d} at {v}.',
    m_zauzet: 'That slot is taken or something went wrong, please choose another.',
    ucitavam: 'Loading…',
    m_jedan_dnevno: 'You already have an appointment that day. Only one appointment per day is allowed.',
    m_max_buducih: 'You already have {n} upcoming appointments. You can book a new one after one has passed or been cancelled.',
    dug_info: 'You have an unpaid appointment (missed or cancelled late): {d}. At this visit you also pay for it ({x} €).',
    ukupno: 'total {x} €', nisi_dosao: 'Missed · not paid', nisi_dosao_placeno: 'Missed · paid',
    kasno_otkazano: 'Cancelled late · not paid', kasno_otkazano_placeno: 'Cancelled late · paid',
    kasno_upozorenje: 'Your appointment is less than {h} hours away. If you cancel now or do not show up, you must pay the full price of this appointment ({x} €)!',
    otkaz_greska: 'Cancelling failed, please try again.',
    brisanje_blizu: 'You can delete your account 2 days after your last appointment. If you have an appointment in the next {h} hours, cancel it first.',
    pravilo_dolazak: 'Cancel at least {h} hours before. If you cancel later or do not show up, you pay for that appointment at your next visit.',
    brisanje_dug: "Your account can't be deleted until the missed appointment is paid. Please contact the salon.",
    obrisi_info: 'Deleting permanently removes your account, personal data and all your appointments. This cannot be undone.',
    lozinka_potvrda: 'Password (to confirm)', obrisi_gumb: 'Delete account permanently', odustani: 'Cancel',
    potvrdi_brisanje: 'Are you sure you want to permanently delete your account and all your appointments?', racun_obrisan: 'Account deleted.',
    kriva_lozinka: 'Wrong password.', brisanje_greska: 'Deletion failed, please try again.',
    p_privatnost: 'Privacy policy', pristanak: 'I accept the', pravila_privatnosti_link: 'privacy policy',
    e_pristanak: 'You need to accept the privacy policy to sign up.',
    pv_h1: 'Who processes your data', pv_t1: 'The data controller is {naziv}, {adresa}, phone {telefon}. The app is used only for booking appointments at this salon.',
    pv_h2: 'What data we collect', pv_t2: 'The name, mobile number and email address you enter when signing up, and data about your appointments: date, time, service, note and a record of attendance, missed and unpaid appointments.',
    pv_h3: 'Why we collect it', pv_t3: "So you can book, view and cancel appointments, and so the salon can contact you about them. The legal basis is providing the service you requested and the salon's legitimate interest in keeping a record of appointments and no-shows.",
    pv_h4: 'Where data is stored and who sees it', pv_t4: 'Data is stored in Google Firebase. Only you and the salon can see your appointments and details. Data is not sold or shared with others for marketing.',
    pv_h5: 'How long', pv_t5: 'As long as you have an account. When you delete your account (Settings → Delete account), your account, personal data and all appointments are permanently deleted. If there is an unpaid missed appointment, the account can be deleted once it is settled.',
    pv_h6: 'Your rights', pv_t6: 'You have the right to access, correct (Settings → User profile), delete and object to the processing of your data. Contact the salon for any request. If you believe your data is processed unlawfully, you can file a complaint with the Croatian Data Protection Agency (azop.hr).',
    pv_h7: 'Cookies', pv_t7: 'The app does not use tracking or advertising cookies. The browser only remembers your chosen language and your login.'
  }
};

let lang = 'hr';
try { lang = localStorage.getItem('jezik') || 'hr'; } catch {}
if (!R[lang]) lang = 'hr';

export const jezik = () => lang;
const ZADANO = { naziv: SALON.naziv, h: SALON.rokOtkaza, adresa: SALON.adresa, telefon: SALON.telefon };
export const t = (k, v = {}) =>
  (R[lang][k] ?? R.hr[k] ?? k).replace(/\{(\w+)\}/g, (_, n) => v[n] ?? ZADANO[n] ?? '');

export function primijeni() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(e => { e.textContent = t(e.dataset.i18n); });
  if (document.body.dataset.title) document.title = t(document.body.dataset.title);
  document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('aktivno', b.dataset.lang === lang));
}

export function postavi(l) {
  lang = l;
  try { localStorage.setItem('jezik', l); } catch {}
  primijeni();
  document.dispatchEvent(new Event('jezik'));
}

document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => postavi(b.dataset.lang)));
primijeni();
