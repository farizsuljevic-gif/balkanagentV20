# Balkan Agent — GitHub flat verzija

Ova verzija nema nijedan folder. Sve fajlove ubacite direktno u glavni dio GitHub repozitorijuma:

- index.html
- styles.css
- app.js
- privacy.html
- terms.html
- README.md

## GitHub upload

1. Otvorite svoj repozitorijum.
2. Kliknite **Add file → Upload files**.
3. Označite svih šest fajlova iz ovog paketa.
4. Kliknite **Commit changes**.
5. U Cloudflare Pages povežite isti GitHub repozitorijum.
6. Build command ostavite prazno, a output directory postavite na `/` ili ostavite podrazumijevano ako Cloudflare to dozvoli.

## Kontakt forma

Forma šalje upite preko FormSubmit na `info@balkanagent.com`. Nakon prvog probnog slanja FormSubmit obično pošalje aktivacionu poruku na tu adresu. Otvorite je i potvrdite adresu; prije potvrde forma neće normalno prosljeđivati upite.

Ako koristite drugi e-mail, u `index.html` pronađite:

`https://formsubmit.co/ajax/info@balkanagent.com`

i zamijenite samo e-mail adresu.

## AI demo

Chat je demonstracioni i radi odmah, bez API ključa i bez backend foldera. Daje unaprijed programirane, realne odgovore o cijeni, kanalima, rezervacijama i uslugama. Pravi generativni AI chat zahtijeva backend ili Cloudflare Worker, što se ne može bez dodatne serverske konfiguracije.

## Prije lansiranja

Provjerite kontakt e-mail, pravne tekstove, cijenu i sve tvrdnje na sajtu. Politika privatnosti i uslovi su početni tekstovi i treba ih uskladiti sa stvarnim pravnim licem prije naplate klijentima.
