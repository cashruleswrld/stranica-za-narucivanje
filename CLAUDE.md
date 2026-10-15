# Aplikacija za naručivanje (predložak za salone) – upute za Claude

## Vlasnik projekta
Student, nije programer. Odgovaraj **na hrvatskom**, jednostavno, korak po korak (što kliknuti na GitHubu / u Firebaseu). Ne objašnjavaj kod ako ne pita.

## Što je projekt
Općenita PWA za naručivanje termina koju vlasnik prodaje salonima (frizeri, saloni za nokte, kozmetičari i sl.).
Nastala je iz aplikacije za "Edi Barbershop" (zaseban repozitorij `edi-barber`, **ne dirati ga odavde**).
- Čisti HTML/CSS/JS, bez build alata i bez npm-a u projektu. GitHub Pages, grana `main`, root. Admin: `/admin.html`.
- **Sve što je specifično za jedan salon je u `postavke.js`**: naziv, logo, telefon, adresa, Instagram, email vlasnika,
  radno vrijeme po danima, trajanje termina, usluge (hr/en naziv + cijena), dana unaprijed, max budućih termina, rok otkaza, Firebase config.
  Kod ne smije imati podatke konkretnog salona; novo podešavanje dodaj u `postavke.js`.
- Za novog klijenta mijenja se još: email u `firestore.rules`, naziv u `manifest.json` / `manifest-admin.json`, po želji `icon-192.png` / `icon-512.png` i logo.
- Usluga se uz termin sprema kao "Naziv (20 €)" pa stari termini pamte staru cijenu.
- Tekstovi su rodno neutralni (klijenti mogu biti i muški i ženski).

## Fajlovi
- `postavke.js` – `SALON`, `IZRADA` (kontakt izrađivača na stranici "O aplikaciji"), `FIREBASE`.
- `index.html` – klijentska aplikacija, hash rute (#pocetna #usluge #termini #postavke, podstranice #prijava #registracija #rezervacija #profil #racun #oaplikaciji #obrisi). Cjenik, izbornik usluga, radno vrijeme i podaci salona pune se iz `postavke.js`.
- `admin.html` – vlasnik salona: kalendar (učitava samo prikazani mjesec), termini dana, povijest klijenta u `<dialog>`, gumbi Otkaži / Nije došao/la / Plaćeno / Ipak je došao/la / Oprosti. Odjavljuje svakoga tko nije `emailVlasnika`.
- `app.js` – Firebase (SDK 10.12.2 s gstatic CDN-a). Izvozi `Store`, `Profil`, `Auth`, `provjeriTel`, `cijena`, `satiDo`, `ROK_OTKAZA`, `vrijednostUsluge`, `nadjiUslugu`, `satiZaDan`, `radiDan`, `DANI`.
- `kalendar.js` – zajednički kalendar (`kalendar(el, {loc, odabir, onemoguci, oznaka, od, do, naMjesec})`, `ymd`).
- `jezik.js` – prijevodi hr/en, `data-i18n`, `t()`. `{naziv}` i `{h}` se popunjavaju iz postavki. Svaki novi tekst dodaj u **oba** jezika.
- `style.css` – tamnosiva tema (pozadina #2b2a2b, kartice #363435), naglasak bijeli (`--naglasak`), greške jantarne (`--greska`), crvena samo za brisanje računa i kasni otkaz (`--crvena`).
- `firestore.rules` – pravila baze (email vlasnika u funkciji `vlasnik()`, rok otkaza 8 h). **Ne primjenjuju se sama**: lijepe se u Firebase konzolu.
- `sw.js` – service worker. **Pri svakoj izmjeni povećaj `CACHE`** (trenutno `salon-v2`); novi JS fajl dodaj u `FILES`.
- `racun.html` – samo preusmjerenje.

## Baza (Firestore, Spark besplatni plan; Auth samo email+lozinka; svaki salon ima SVOJ Firebase projekt)
- `slots/{datum_vrijeme}` – zauzeti sati (bez osobnih podataka).
- `termini/{datum_vrijeme}` – {ime, tel, usluga, datum, vrijeme, napomena, created, uid, [nijeDosao, podmireno]}.
- `termini/{datum_vrijeme}_k` – kasno otkazan termin: kopija + {otkazanKasno, nijeDosao: true, podmireno: false}.
- `dnevno/{uid}_{datum}` – najviše 1 termin u danu po osobi.
- `korisnici/{uid}` – {ime, tel}.
- Naručivanje je batch (slot + dnevno + termin). Neplaćen nedolazak / kasni otkaz = dug.
- Paziti na limit od 50.000 čitanja dnevno: ne učitavati cijelu kolekciju `termini`.
- Termini su jedan po jedan (jedna osoba radi); više zaposlenika istovremeno zasad nije podržano.

## Odluke (ne predlagati ponovno)
Bez Telegram obavijesti, bez prijave Googleom/Appleom, bez Firebase Cloud Functions.

## Kako radimo
1. Radi izmjene, testiraj u pregledniku (Playwright/Chromium je dostupan; Firebase zamijeni lažnim modulima preko `page.route` na `https://www.gstatic.com/**`). Ako mijenjaš `firestore.rules`, testiraj ih u Firebase emulatoru.
2. Povećaj `CACHE` u `sw.js`, commitaj i pushaj na zadanu granu.
3. Vlasniku napiši: što se promijenilo, kako objaviti (GitHub: Compare & pull request → Create pull request → Merge pull request → Confirm merge, pa zelena kvačica na Actions), i što testirati.
4. Ako su se promijenila pravila: podsjeti ga da nakon mergea **kopira `firestore.rules` u Firebase → Firestore Database → Rules → Publish**.
5. Nakon objave: ugasiti i ponovno otvoriti aplikaciju (ili Ctrl + Shift + R).
