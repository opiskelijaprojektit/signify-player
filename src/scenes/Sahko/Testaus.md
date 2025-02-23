🛠 Sähkönhintasovelluksen testausohjeet

Tämä dokumentti kuvaa sen ,miten sovelluksen toiminta testataan ja varmennetaan ennen tuotantokäyttöä.

📌 Sisältö:
1️⃣ Projektin käynnistäminen ja API-riippuvuuksien varmistaminen
2️⃣ Sähkönhinta-API:n toiminnan varmistaminen
3️⃣ Sovelluksen perustoimintojen testaus
4️⃣ Käyttöliittymän ja responsiivisuuden tarkistus
5️⃣ Virhetilanteiden käsittely
1️⃣ Projektin käynnistäminen ja API-riippuvuuksien varmistaminen

📌 Ennen testaamista varmista, että projektin riippuvuudet on asennettu ja API-kutsut toimivat.
🔹 Asenna riippuvuudet (jos ei ole vielä tehty):

npm install

🔹 Käynnistä React-sovellus:

npm run dev

➡ Tarkista, että sovellus avautuu selaimessa osoitteessa:
http://localhost:5173
(tai terminaalissa näkyvässä osoitteessa).


2️⃣ Sähkönhinta-API:n toiminnan varmistaminen

Sovellus hakee sähkön hintatiedot sahkohinta-api.fi-rajapinnasta. Testaa API:n toiminta ennen kuin jatkat sovelluksen testaamista.

📌 Testaa API-haku selaimessa lisäämällä seuraava rivi selaimen osoitekenttään:

curl -X GET "https://www.sahkohinta-api.fi/api/v1/halpa?tunnit=1&tulos=haja&aikaraja=$(date +%Y-%m-%d)"

✅ Esimerkkivastaus:

[
  {
    "aikaleima_suomi" : "2025-02-24T12:00",
    "aikaleima_utc" : "2025-02-24T10:00",
    "hinta" : "17.95100"
  }
]

📌 Tarkista seuraavat asiat:
✅ API palauttaa JSON-datan ilman virheitä.
✅ aikaleima_suomi ja hinta ovat oikean päivän tiedot.
✅ Jos API ei vastaa tai palauttaa virheen "404 Not Found", testaa eri päivämäärällä tai odota päivitysaikaa (katso kohta 2.2).


🔹 2.1 API:n päivitysaikataulu

📌 API:n tiedot päivittyvät seuraavasti:

    Nord Pool julkaisee seuraavan päivän sähkön hinnat päivittäin klo 13:45 (CET).
    ENTSO-E päivittää hintatiedot viimeistään klo 15:00 (CET).
    Sähkönhinta-API päivittyy tämän jälkeen, mutta viiveitä voi esiintyä.

    Jos testaat ennen klo 15:00, saatat nähdä vanhoja hintatietoja.


3️⃣ Sovelluksen perustoimintojen testaus

Testaa sovelluksen päätoiminnot ja varmista, että se hakee ja näyttää sähkön hinnat oikein.

📌 Testattavat kohdat:
✔ Sähkön hinnan hakeminen onnistuu ja tiedot päivittyvät ajantasaisesti.
✔ Halvin ja kallein tunti näkyvät oikein ja vastaavat API:n palauttamia tietoja.
✔ Nykyhetken hinta näkyy punaisena pisteenä kaaviossa oikeassa kohdassa.
✔ Kaavio piirtää päivän hintakehityksen ilman visuaalisia virheitä.
4️⃣ Käyttöliittymän ja responsiivisuuden tarkistus

Sovelluksen ulkoasun tulee toimia eri laitteilla ja selaimilla.

📌 Testaa eri laitteilla ja selaimilla:
✔ Google Chrome
✔ Mozilla Firefox
✔ Microsoft Edge
✔ Safari (Mac/iOS)
✔ Android/iOS mobiiliselaimet

🔹 Tarkista seuraavat asiat:

✅ Kaavio skaalaantuu oikein eikä leikkaudu.
✅ Nykyhetken punainen pallo näkyy oikeassa kohdassa kaaviossa.
✅ Tekstit pysyvät selkeinä eikä mene päällekkäin.


5️⃣ Virhetilanteiden käsittely

Testaa, miten sovellus reagoi erilaisiin virhetilanteisiin.

📌 Testattavat virheet:

🚨 1. API ei vastaa / verkkoyhteys katkeaa

    Irrota verkkoyhteys tai sulje API-palvelin.
    Tarkista, että sovellus näyttää virheilmoituksen:
    "Virhe ladattaessa sähkön hintaa"

🚨 2. API palauttaa tyhjän vastauksen

    Testaa URL:lla, jossa ei ole dataa:

    curl -X GET "https://www.sahkohinta-api.fi/api/v1/halpa?tunnit=1&tulos=haja&aikaraja=2000-01-01"

    Tarkista, että sovellus näyttää virheilmoituksen:
    "Hintatietoja ei saatavilla"

🚨 3. Sovellus lataa pitkään

    Hidasta verkkoyhteyttä kehittäjätyökalujen "Network Throttling"-asetuksella.
    Varmista, että latausnäyttö näkyy:
    "Ladataan päivän sähkön hintatietoja..."

🚨 4. React-komponentti kaatuu

    Avaa "React DevTools"-työkalut ja tarkista, jos tilamuuttujat ovat undefined tai null.

✅ Testauksen yhteenveto

Tämä testausohje varmistaa, että sovellus toimii kaikissa tärkeimmissä tilanteissa ja virhetilanteissa.

   Kun kaikki testit ovat onnistuneet ja back-end puoli saatu valmiiksi:
   Sovellus on valmis julkaistavaksi