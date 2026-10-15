// ===================================================================
//  POSTAVKE SALONA – za novog klijenta mijenja se samo ova datoteka
//  (+ email vlasnika u firestore.rules i naziv u manifest.json / manifest-admin.json)
// ===================================================================

export const SALON = {
  naziv: 'Studio Lana',
  logo: '',                    // npr. 'logo.svg' (bijeli logo na prozirnoj pozadini); prazno = prikazuje se naziv
  telefon: '091 000 0000',
  adresa: 'Ilica 1, Zagreb',
  instagram: '',               // korisničko ime bez @ (prazno = sakriveno)

  // Email s kojim se vlasnik prijavljuje u admin.html (isti mora biti i u firestore.rules)
  emailVlasnika: 'bornapavicic85@gmail.com',

  // Radno vrijeme po danima: [otvara, zatvara], null = zatvoreno
  radnoVrijeme: {
    pon: ['09:00', '20:00'],
    uto: ['09:00', '20:00'],
    sri: ['09:00', '20:00'],
    cet: ['09:00', '20:00'],
    pet: ['09:00', '20:00'],
    sub: ['09:00', '14:00'],
    ned: null
  },
  trajanjeTermina: 30,         // minuta između dva termina
  blagdani: true,              // true = na hrvatske blagdane se ne može naručiti
  neradniDani: [],             // dodatni zatvoreni dani, npr. ['2026-12-24', '2026-12-31']

  // Usluge: naziv na hrvatskom i engleskom, cijena u eurima
  usluge: [
    { hr: 'Žensko šišanje', en: "Women's haircut", cijena: 25 },
    { hr: 'Feniranje', en: 'Blow-dry', cijena: 15 },
    { hr: 'Bojanje kose', en: 'Hair colouring', cijena: 45 },
    { hr: 'Manikura', en: 'Manicure', cijena: 20 },
    { hr: 'Gel lak', en: 'Gel polish', cijena: 25 },
    { hr: 'Pedikura', en: 'Pedicure', cijena: 30 }
  ],

  danaUnaprijed: 60,           // koliko dana unaprijed se može naručiti
  maxBuducih: 0,               // najviše budućih termina po osobi (0 = bez ograničenja)
  jedanTerminDnevno: false,    // true = osoba može imati najviše 1 termin u danu
  rokOtkaza: 8                 // sati; ako mijenjaš, promijeni i "8" u firestore.rules
};

// Kontakt izrađivača aplikacije (stranica "O aplikaciji"); prazno = sakriveno
export const IZRADA = {
  whatsapp: '385917979793',    // broj bez + i razmaka
  whatsappTekst: '091 797 9793',
  instagram: 'borna.pavicicc'
};

// Firebase projekt ovog salona (Firebase konzola → Project settings → Your apps → Web app → Config)
export const FIREBASE = {
  apiKey: 'AIzaSyBmwpJtipxRnofcEGK4RJX85Vjm8BxazrI',
  authDomain: 'stranica-za-narucivanje.firebaseapp.com',
  projectId: 'stranica-za-narucivanje',
  storageBucket: 'stranica-za-narucivanje.firebasestorage.app',
  messagingSenderId: '746009900269',
  appId: '1:746009900269:web:234c0d42d24fa9270608e4'
};
