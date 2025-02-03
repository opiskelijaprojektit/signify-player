# Projektiin osallistuminen

Tältä sivulta löydät ohjeet siihen, miten osallistut mukaan projektiin toteuttamalla projektiin jotain uutta. Osallistuminen voidaan jakaa seuraaviin vaiheisiin:
 1. projektin kopioiminen omalle koneelle,
 2. kehityshaaran lisääminen projektiin,
 3. toiminnallisuuden toteuttaminen ja
 4. toteutetun toiminnallisuuden palautus.

Jotta voit osallistua mukaan projektiin, niin tarvitset siihen käyttäjätunnuksen GitHub-palveluun.

## Projektin kopiointi omalle koneelle

Tee projektista kopion seuraavilla vaiheilla:

1. Mene projektin GitHub-sivulle osoitteessa [https://github.com/opiskelijaprojektit/signify-player](https://github.com/opiskelijaprojektit/signify-player) ja tee siitä itsellesi uusi *kopiohaara* (fork) seuraavasti: 
   - Klikkaa sivun yläosassa olevaa **Fork**-nappia. 
    - Valitse *Owner*-valintalistan alta organisaatio, johon kopio luodaan. Voit valita tässä oman käyttäjätunnuksesi.
    - Paina **Create fork**-nappia.

2. Mene edellä tekemäsi kopiohaaran projektisivulle ja kopioi **Code**-napin alta kloonausosoite muistiin seuraavaa vaihetta varten.

3. Suorita oman koneesi komentorivillä seuraavat komennot:
   ```sh
   cd ~/Documents/projektit
   git clone (kopiohaaran kloonausosoite)
   cd ~/signify-player
   npm install
   ```
   > Nämä komennot olettavat, että sinulla on projektit-niminen kansio Documents-kansion alla.

4. Käynnistä API-kutsuissa käytettävä testauspalvelin komentorivillä seuraavilla komennoilla:
   ```sh
   cd ~/Documents/projektit/signify-player
   npm run server
   ```

   > Projektin *server*-kansiosta löytyy `data.json`-niminen tiedosto, jota muokkaamalla saa määriteltyä, mitä testauspalvelin vastaa sovelluksen tekemille API-kutsuille.

5. Käynnistä React-sovellus toisessa komentorivissä komennoilla:
   ```sh
   cd ~/Documents/projektit/signify-player
   npm run dev
   ```   

## Kehityshaaran lisääminen projektiin

Kun olet valinnut (ja sopinut), minkä TODO-listassa olevista toiminnallisuuksista toteutat, niin tee aluksi seuraavat asiat, jotta tekemäsi muutokset tulevat omaan kehityshaaraansa (branch).

Suorita seuraava komento projektikansiossa:

   ```sh
   git checkout -b scene-tunniste
   ```
   missä korvaat `scene-tunniste` -tekstin TODO-listassa olevalla tunnisteella. Näin kehityshaaroille tulee sopivan kuvaava nimi.

Nyt voit tehdä projektiin haluamasi muutokset. Voit tehdä kehityshaaraan haluamasi määrän talletuksia (committeja). Ennen kuin teet committia, niin varmista, ettet tallenna talletuksessa mitään ylimääräisiä tiedostoja. Anna talletuksen kuvaukseksi jokin kuvaava teksti, kuten esimerkiksi `muuttaa näkymän ulkoasun vastaamaan muuta sisältöä`.

## Toiminnallisuuden toteuttaminen

Nämä seuraavat vaiheet ovat suuntaa antavia, voit toteuttaa toiminnallisuuden myös eri tavalla. Lukaise kuitenkin nämä ohjeet lävitse, sillä ne sisältävät oleellista tietoa sovelluksen ja testipalvelimen toiminnasta.

Voit edetä näitä vaiheita kerralla maaliin periaatteella eli teet kunkin vaiheen kerralla valmiiksi. Vaihtoehtoisesti voit ensin toteuttaa ensin pienen osan vaihe vaiheelta ja laajentaa toteutustasi kierros kierrokselta.

1. **Näkymän graafinen suunnittelu**

   Ennen toteuttamista kannattaa miettiä hyvin pitkälle se, miltä toteuttamasi scene-näkymä tulee lopulta näyttämään graafisesti. Tämä auttaa hahmottamaan jatkossa, mitä tietoa palvelimelta tarvitaan sisältötietojen lataamisen yhteydessä. Tässä vaiheessa kannattaa miettiä jo valmiiksi, miltä näkymä näyttää sekä vaaka- että pystysuuntaisena.

   Voit suunnitella näkymän haluamallasi työvälineellä, kuten esimerkiksi [Figmalla](https://www.figma.com/). 
   
   Signifyn virallinen fontti on Chris Simpsonin tekemä [Metropolis](https://github.com/dw5/Metropolis), jota olisi hyvä käyttää ensisijaisena leipätekstissä käyttävänä fonttina. CSS-tyyleihin upotettavana se löytyy mm. [CDNFonts.com](https://www.cdnfonts.com/metropolis-2.font)-sivulta.

2. **API-rajapinnan palauttama sisältö**

   Selainsovellus tarkistaa kehitysympäristössä 30 sekunnin välein, onko laitteelle liitetyssä sisällössä tapahtunut muutoksia. Jos on, niin silloin uusi, ladattu sisältö päivitetään ja selain muokkaa esitystään automaattisesti. Tuotantoympäristössä tämä tarkistus tapahtuu viiden minuutin välein.

   Koska oikean API-rajapinnan muokkaaminen ei ole tähän projektiin kuuluva tehtävä, on  projektiin toteutettu API-rajapinnan toimintaa mukaileva palvelinskripti, jonka saa käynnistettyä komennolla:

   ```sh
   npm run server
   ```

   Voit muuttaa skriptin API-kutsujen palauttamien vastausten sisältöjä muokkaamalla **server/data.json**-tiedoston sisältöä. Tämän tiedoston `scenes`-taulukko sisältää selainsovellukselle lähettävän sisältödatan. Jokaisen scene-näkymä tulee sisältää seuraavat tiedot:
    - `id`: Näkymän yksilöivä tunniste, joka on sama kuin tietokannassa olevan sisällön yksilöivä tunniste. Testausdataan riittää, että määrittelet tähän numeron, joka on eri kuin minkään muun sisällön tunniste.
    - `type`: Näkymän tyyppi. Tämä merkkijono kertoo, minkälainen näkymä on kyseessä. Esimerkiksi `image` kertoo, että kyseessä on kuva. Vastaavasti `weather` kertoisi, että kyseessä on säätietoja tuottava näkymä.
    - `data`: Näkymän sisältö JSON-oliona. Tässä tuodaan näkymälle tarvittavat tiedot sopivana oliorakenteena. Esimerkiksi `image`-näkymässä välitetään `url`-tietue, joka sisältää sekä pysty- (`portrait`) että vaakasuuntaisen (`landscape`) kuvan sijaintitiedon. 

      Jos näkymän on tarkoitus hakea jostain ulkoisesta palvelusta tietoja API-kutsujen kautta, niin silloin API-kutsuissa tarvittava API-avain välitetään yhtenä tietona `data`-tietueen sisällä. Toisin sanoen API-avainta ei milloinkaan tallenneta selainsovelluksen ohjelmakoodiin, vaan se tulee aina palvelimelta sisältötietojen yhteydessä.
    - `duration`: Näkymän esitysaika millisekunteina.

   Mieti, mitä tietoja selain tarvitsee, jotta se pystyy itsenäisesti muodostamaan näkymän selainruudulle. Välitä nämä tiedot `data`-tietueen sisällä. Määrittele tiedoille kuvaavat, englannin kieliset nimet.

   > Voit tutkia API-rajapinnan palauttaa sisältöä *Command Prompt* -komentorivillä seuraavilla komennoilla. Huomaa, että nämä komennot eivät toimi sellaisenaan PowerShellissä, koska PowerShell korvaa curl-ohjelman omalla versiollaan.
   > ```sh
   > curl -X POST -H "Content-Type: application/json" -d "{ \"width\":1920, \"height\": 1080 }" http://localhost:3000/register
   >
   > curl -X POST -H "Content-Type: application/json" -H "x-API-key: wannabeapikey" -d "{ \"width\":1920, \"height\": 1080 }" http://localhost:3000/check
   >
   > curl -X GET -H "x-API-key: wannabeapikey" http://localhost:3000/scenes
   > ```

3. **Näkymän toteuttaminen**

   Toteuta näkymästä uusi komponentti *src/scenes*-kansion alle. Malliesimerkin toteutuksesta ja dokumenoinnista näet Image-komponentin tiedostoista. 
    
   Lisää toteuttamasi komponentti *src/component/scene*-kansion **Scene.jsx**-tiedostoon seuraavasti:
    - Lisää komponentin tuonti tiedoston alussa.
    - Lisää komponentille käsittelijä `Scene`-funktion alussa olevaan `props.scenes`-taulukon map-käsittelijään. Toisin sanoen lisää Switch-lauseeseen uusi case-osio, joka vastaa tekemääsi komponenttia. Huomaa, että tekemäsi komponentti tulee kääriä SwiperSlide-komponentin sisälle, muuten toteutuksesi ei toimi.

   Jos komponentti hyödyntää palvelimelle tallennettavaa dynaamista sisältöä, kuten esimerkiksi käyttäjän itse lisäämiä kuvia, niin ne sijoitetaan *server/media*-kansion alle. Käytä tämän kansion alle tulevien tiedostojen nimeämisessä UUID-tunnisteita, sellaisen voi luoda esimerkiksi tällä [sivustolla](https://www.uuidgenerator.net/).

4. **Testaa toteutus**

   Testaa, miten toteutuksesi toimii. Jos lisäsit serverille tiedot toteuttamastasi näkymästä ja kytkit sen oikein Scene-komponentissa, niin silloin toteutuksesi pitäisi näkyä osana esitystä.

   Muista testata toteutuksesi toiminta myös pystysuuntaisella näytöllä. Tämä tapahtuu niin, että muutat näytön suunnan käyttöjärjestelmän puolelta pystyasentoon ja päivität selainsovelluksen. Selainsovellus tunnistaa automaattisesti näytön suunnan ja renderöi sitä vastaavan näkymän.

5. **Iteroi**

   Jos teet toteutustasi pieni osa kerrallaan, niin aloita uudelleen kohdasta yksi, kunnes olet tyytyväinen toteutukseesi.

## Toteutetun toiminnallisuuden palautus

Kun olet saanut toiminnallisuuden toteutettua, on sen palautuksen aika. Tämä tapahtuu tekemällä muutoksistasi **pull request** -pyynnön seuraavasti.

1. Varmista, että olet vienyt kaikki tekemäsi muutokset versiohallintaan eli olet tehnyt talletuksen viimeisimmän muutoksen jälkeen.

2. Siirrä paikallisesti tekemäsi muutokset GitHub-repoon suorittamalla projektikansiossa seuraava komento:
   
   ```sh
   git push origin scene-tunniste
   ```

   Korvaa `scene-tunniste` -teksti kehityshaaran nimellä, jonka aikaisemmin loit. 

3. Mene GitHubissa oman projektisi sivuille ja tee seuraavat asiat:
    - Paina vihreää **Compare & pull request** -nappia.
    - Kirjoita otsikoksi `lisää uuden näkymän scene-tunniste`, missä korvaat `scene-tunniste`-tekstin paikalle toteuttamasi toiminnon tunnisteen.
    - Kirjoita kuvaustekstiksi lyhyt kuvaus siitä, mitä olet toteuttanut.
    - Paina vihreää **Create pull request**-nappia.

4. Jää odottamaan, että toteuttamasi toiminto joko hyväksytään osaksi projektia tai siihen pyydetään tekemään korjauksia.