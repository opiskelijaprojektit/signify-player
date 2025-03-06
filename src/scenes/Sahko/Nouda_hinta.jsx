/**
 * @file Nouda_hinta.jsx
 * @description Tämä komponentti hakee sähkön hintatiedot API:sta ja visualisoi ne kaaviona.
 * @author Vesa Pellikka
 */ 
 
 //Tuodaan Reactin tarvittavat hookit ja komponentit
 //- `React` tarvitaan JSX-syntaksin käyttämiseen.
 //- `useEffect`: Hook, joka suorittaa sivuvaikutuksia, kuten API-haun komponentin latautuessa.
 //- `useState`: Hook, joka mahdollistaa tilan hallinnan komponentissa.
 import React, { useEffect, useState } from "react";


 //Tuodaan Chart.js-visualisointityökalu
 // - `Line`: LineChart-komponentti, joka piirtää sähkön hintojen kehityksen kaaviona.
 // - Jos kaavio ei toimi, varmista, että seuraavat paketit on asennettu:
 //   `npm install react-chartjs-2 chart.js`
 import { Line } from "react-chartjs-2";

//Chart.js:n automaattinen konfigurointi
//Tämä auttaa Chart.js:n toiminnallisuuksia toimimaan ilman ylimääräistä asetusten määrittämistä.
import "chart.js/auto";

// Tuodaan sovelluksen tyylitiedosto
//- `Sahko.css` sisältää ulkoasun määrittelyt, kuten fontit, värit ja asettelut.
import "./Sahko.css";   

const NoudaHinta = () => {

    /**
     * Esitellään useState-hookit, joihin sähkön hinnan ja
     * näkymän tilatiedot tallennetaan.
     */

        // `prices`: Taulukko, joka sisältää kaikki haetut hintatiedot päivän tunneista.
        // Päivittyy API-haun jälkeen `setPrices(data)`.
    const [prices, setPrices] = useState([]);

        // `lowestPrice`: Tallentaa päivän halvimman sähkön hinnan (halvimman tunnin tiedot).
        // Päivitetään `setLowestPrice(minPrice)`, kun halvin tunti löydetään.
    const [lowestPrice, setLowestPrice] = useState(null);

        // `highestPrice`: Tallentaa päivän kalleimman sähkön hinnan (kalleimman tunnin tiedot).
        // Päivitetään `setHighestPrice(maxPrice)`, kun kallein tunti löydetään.
    const [highestPrice, setHighestPrice] = useState(null);
    
        // `currentPrice`: Tallentaa nykyhetken sähkön hinnan (nykyisen tunnin tiedot).
        // Päivitetään `setCurrentPrice(currentHour)`, kun nykyhetken tunti haetaan.
    const [currentPrice, setCurrentPrice] = useState(null);

        // `loading`: Ilmaisee, onko sähkön hintatiedot vielä latautumassa.
        // Asetetaan `false`, kun API-haku on valmis.
    const [loading, setLoading] = useState(true);

        // `error`: Tallentaa mahdollisen virheilmoituksen API-haun epäonnistuessa.
        // Päivitetään `setError(err.message)`, jos virhe tapahtuu.
    const [error, setError] = useState(null);




/**
    Haetaan sähkön hinnat API:sta komponentin latautuessa.
    Tämä funktio kutsuu rajapintaa, joka palauttaa päivän kaikki sähkön tuntihinnat.
    - Jos haku onnistuu, hintatiedot tallennetaan `prices`-tilamuuttujaan.
    - Jos haku epäonnistuu, virhe tallennetaan `error`-tilaan.
*/
    useEffect(() => {
             /**                       
               `fetchData`-funktio on **asynkroninen (`async`)**, mikä tarkoittaa,
               että se suorittaa verkkopyynnön ilman, että se estää muun koodin etenemistä.
                 - **Päivämäärän tarkistus:** Varmistetaan, että data haetaan vain kerran päivässä.
                 - **Ajastin (`setInterval`):** Päivittää tiedot 30 sekunnin välein, mutta ei tee turhia hakuja, jos tiedot ovat jo ajan tasalla.
               - `await`-avainsana käytetään verkkopyynnön (`fetch`) ja JSON-parsinnan yhteydessä,
                 jotta data voidaan hakea asynkronisesti ja odottaa sen valmistumista ennen jatkamista.
               - Tämä varmistaa, että React ei renderöi komponenttia ennen kuin tarvittava data on saatavilla.
             */
        const fetchData = async () => {
            // Haetaan nykyinen päivämäärä muodossa YYYY-MM-DD
        const today = new Date().toISOString().split("T")[0];

        // Tarkistetaan, onko tiedot jo päivitetty tänään
        if (lastFetchedDate === today) {
            console.log("Tiedot ovat jo ajantasaiset, ei tehdä uutta hakua.");
            return;
        }
            try {
                // Kutsutaan APIa sähkön hintatietojen hakemiseksi
                const response = await fetch(`https://www.sahkonhintatanaan.fi/api/v1/prices/${today.split("-")[0]}/${today.split("-")[1]}-${today.split("-")[2]}.json`);

                // Tarkistetaan, onnistuiko API-pyyntö (200 OK)
                if (!response.ok) {
                    throw new Error("Virhe ladattaessa sähkön hintaa");// Virheen käsittely
                }
                
                // Muunnetaan API-vastaus JSON-muotoon
                const data = await response.json();

                //Jos dataa ei ole saatavilla, näytetään virheilmoitus
                if (data.length === 0) {
                    throw new Error("Hintatietoja ei saatavilla");// Virheen käsittely
                }

                // **Tallennetaan haetut hintatiedot `prices`-tilamuuttujaan**
                setPrices(data);

                // Etsitään päivän halvin ja kallein tunti
                // - `reduce()`-metodi käy läpi kaikki hintatunnit ja löytää alimman sekä korkeimman arvon
                const minPrice = data.reduce((min, p) => (p.EUR_per_kWh < min.EUR_per_kWh ? p : min), data[0]);
                const maxPrice = data.reduce((max, p) => (p.EUR_per_kWh > max.EUR_per_kWh ? p : max), data[0]);

                setLowestPrice(minPrice);   // Päivitetään päivän halvin hinta
                setHighestPrice(maxPrice);  // Päivitetään päivän kallein hinta

                // Haetaan nykyhetken hinta vertaamalla tuntien aikaleimoja
                // - `find()` etsii tunnin, joka `time_start` vastaa nykyistä tuntia.
                const currentTime = new Date();
                const currentHour = data.find(p => new Date(p.time_start).getHours() === currentTime.getHours());

                if (currentHour) {
                    setCurrentPrice(currentHour);   // Päivitetään nykyhetken hinta
                }

                setLoading(false);      //Lataus valmis
            } catch (err) {
                setError(err.message);  //Tallennetaan virheilmoitus
                setLoading(false);
            }
        };

        fetchData();    //Suoritetaan API-haku heti komponentin latautuessa
    }, []);





    // Jos data on vielä latautumassa, näytetään ilmoitus
    // Tämä varmistaa, että käyttöliittymä ei näytä tyhjää ennen kuin tiedot ovat saatavilla.
    if (loading) return <p>Ladataan päivän sähkön hintatietoja...</p>;

    // Jos virhe tapahtuu API-haussa, näytetään virheilmoitus käyttäjälle.
    //`error`-tilamuuttujaan tallennetaan virheen syy, joka voidaan näyttää käyttöliittymässä.
    if (error) return <p>Virhe ladattaessa: {error}</p>;

/**
    Apufunktio, joka pyöristää sähkön hintanäytöt 3 desimaaliin.
    - `parseFloat(price)`: Muuntaa annetun hinnan liukuluvuksi.
    - `.toFixed(3)`: Pyöristää luvun kolmen desimaalin tarkkuudelle.
      
    Tämä varmistaa, että hinnat näytetään yhdenmukaisessa muodossa
    esimerkiksi `0.123 EUR/kWh` eikä `0.12345678 EUR/kWh`.
*/
    const formatPrice = (price) => parseFloat(price).toFixed(3);





    /**
 * Määritetään kaavion data ja asetukset.
 * - `labels`: Sisältää x-akselin arvot, eli päivän tuntikohtaiset aikaleimat.
 * - `datasets`: Sisältää kaksi sarjaa:
 *      1. **Päivän hintakäyrä** (sininen viiva)
 *      2. **Nykyhetken punainen pallo**, joka korostaa tämänhetkistä hintaa.
 */
    const chartData = {
        labels: prices.map(p =>
            // Muutetaan jokaisen tunnin `time_start`-arvo helposti luettavaan kellonaikamuotoon.
            new Date(p.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })
        ),
        datasets: [
            {   // Päivän hintakäyrä,
                // Sisältää sähkön hinnat kaikilta tunneilta. 
                // Esitetään sinisenä viivana.
                label: "",                                               //Ei otsikkoa
                data: prices.map(p => formatPrice(p.EUR_per_kWh * 100)), // Muutetaan euroista snt/kWh ja pyöristetään 3 desimaaliin
                borderColor: "blue",                                     // Sininen viiva
                backgroundColor: "rgba(10, 10, 147, 0.6)",             // Läpinäkyvä tausta
                fill: true,                                              // Täytetään viivan alla oleva alue
                tension: 0.5,                                            // Pehmennetyt viivat
                order: 2                                                 // Tämä piirretään ennen punaisen pisteen kerrosta
            },

            {
                // Nykyhetken punainen pallo
                // - Näkyy vain siinä tuntikohdassa, joka vastaa tämänhetkistä aikaa.
                //- Käyttää "scatter"-tyyppistä kaaviota, jotta näkyy yksittäisenä pisteenä.
                label: "",                                               //Ei otsikkoa
                // Piirretään vain, jos kyseessä on nykyhetken tunti (Alempi rivi)
                data: prices.map(p => (new Date(p.time_start).getHours() === new Date().getHours() ? formatPrice(p.EUR_per_kWh * 100) : null)),
                borderColor: "red",                                      // Punainen viiva
                pointBackgroundColor: "red",                             // Pisteen väri punainen
                pointBorderColor: "black",                               // Musta reunaviiva pisteelle
                pointRadius: 8,                                          // Pisteen koko
                fill: false,                                             // Ei täyttöä viivan alle
                type: "scatter",                                         // Tämä on yksittäinen datapiste, ei jatkuva viiva
                order: 1                                                // punainen piste näkyviin paremmin
            }
        ]
    };
    
/**
    Kaavion asetukset: Tekstien ja viivojen väriasetukset
    - Määrittelee kaavion responsiivisuuden, tekstityylit ja ruudukon ulkoasun.
    - Hallitsee X- ja Y-akselien väritystä, pykälöintiä sekä ruudukon ulkonäköä.
 */
    const chartOptions = { 
        /**
          Kaavion responsiivisuus
         - Kaavio skaalautuu näytön kokoon dynaamisesti.
         - `maintainAspectRatio: false` estää kaavion pakotetun kuvasuhteen, jolloin se täyttää tilan vapaasti.
        */
        responsive: true,           // Kaavio mukautuu näytön kokoon
        maintainAspectRatio: false, // Estetään kaavion pakotettu kuvasuhde, jotta se täyttää tilan oikein
        
        //X- ja Y-akselien asetukset
        //Määrittelee tekstien ulkoasun ja ruudukon viivat akseleilla
        scales: {

            //X-akselin tekstien tyyli
            x: {
                ticks: {
                    color: "white",    // X-akselin tekstin väri
                    font: {
                        size: 14,      // X-akselin fonttikoko
                        weight: "bold" // X-akselin fontin lihavointi
                    }
                },

                //X-akselin ruudukon tyyli
                grid: {                // X-akselin ruudukon viivojen väri
                    color: "rgba(255, 255, 255, 0.5)"
                }
            },

            //Y-akselin asetukset
            y: {
                beginAtZero: false,     // Y-akseli ei ala nollasta, jotta hinnan vaihtelu erottuu paremmin
                ticks: {
                    stepSize: 5,        // Pykälöinti 5 yksikön välein 
                    color: "white",     // Y-akselin tekstin väri
                    font: {
                        size: 14,       // Y-akselin fonttikoko
                        weight: "bold"  // Y-akselin fontin lihavointi
                    }
                },
                //Y-akselin ruudukon tyyli
                grid: {                 // Y-akselin ruudukon viivojen väri
                    color: "rgba(255, 255, 255, 0.5)"
                }
            }
        },

        //Kaavion lisäosat ja asetukset
        plugins: {
            legend: {
                display: false // Poistaa kaikki otsikot
            }
        }
    };
    
    return (
    /**
       Luokka `"sahko-container"` asettaa taustakuvan ja yleisen asettelun.
       - Sisältää:
            1. Otsikon ja hintatiedot (`ylaosa`)
            2. Kaavion sähkön hintojen visualisointiin (`kaavio-container`)
    */
        <div className="sahko-container">

            {/* Otsikko ja hintatiedot */}
            <div className="ylaosa">

                {/* **Otsikko, joka näyttää päivän sähkön hinnat** */}
                {/* Päivämäärä haetaan dynaamisesti ja muotoillaan suomalaiseen tapaan */}
                <h2 className="otsikko">Sähkön hinta tänään {new Date().toLocaleDateString("fi-FI")}</h2>

                {/* Hintatiedot */}
                {/* Sisältää nykyhetken hinnan, päivän halvimman ja kalleimman hinnan */}
                <div className="hintatiedot">

                    {/* Nykyhetken hinta: haetaan nykyisen tunnin hinta ja näytetään muodossa HH:MM */}
                    {/* - Jos hintatietoa ei ole saatavilla, näytetään viesti "Ei saatavilla" */}
                    <p><strong>Nykyhetken hinta:</strong> {currentPrice ? `${new Date(currentPrice.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}: ${formatPrice(currentPrice.EUR_per_kWh * 100)} snt/kWh` : "Ei saatavilla"}</p>
                    
                    {/* Päivän halvin tuntihinta */}
                    {/* Haetaan muuttujasta `lowestPrice` ja pyöristetään arvo kolmen desimaalin tarkkuudelle */}
                    <p><strong>Halvin tunti:</strong> {formatPrice(lowestPrice.EUR_per_kWh * 100)} snt/kWh</p>

                    {/* Päivän kallein tuntihinta */}
                    {/* Haetaan muuttujasta `highestPrice` ja pyöristetään arvo kolmen desimaalin tarkkuudelle */}
                    <p><strong>Kallein tunti:</strong> {formatPrice(highestPrice.EUR_per_kWh * 100)} snt/kWh</p>
                </div>
            </div>
            {/* **Kaavio sähkön hintojen visualisointiin** */}
            {/* `chartData` sisältää hintatiedot ja `chartOptions` määrittää ulkoasun */}
            <div className="kaavio-container">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default NoudaHinta;
