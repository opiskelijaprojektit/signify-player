import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // jos ei kaavi toimi niin: npm install react-chartjs-2 chart.js
import "chart.js/auto"; // Automaattinen konfigurointi Chart.js:lle
import "./Sahko.css";

const NoudaHinta = () => {
    const [prices, setPrices] = useState([]);
    const [lowestPrice, setLowestPrice] = useState(null);
    const [highestPrice, setHighestPrice] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date().toISOString().split("T")[0]; // Nykyinen päivä muodossa YYYY-MM-DD
                const response = await fetch(`https://www.sahkonhintatanaan.fi/api/v1/prices/${today.split("-")[0]}/${today.split("-")[1]}-${today.split("-")[2]}.json`);

                if (!response.ok) {
                    throw new Error("Virhe ladattaessa sähkön hintaa");
                }

                const data = await response.json();

                if (data.length === 0) {
                    throw new Error("Hintatietoja ei saatavilla");
                }

                setPrices(data);

                // Etsitään päivän halvin ja kallein tunti ilman pyöristyksiä
                const minPrice = data.reduce((min, p) => (p.EUR_per_kWh < min.EUR_per_kWh ? p : min), data[0]);
                const maxPrice = data.reduce((max, p) => (p.EUR_per_kWh > max.EUR_per_kWh ? p : max), data[0]);

                setLowestPrice(minPrice);
                setHighestPrice(maxPrice);

                // Haetaan nykyhetken hinta vertaamalla tuntien aikaleimoja
                const currentTime = new Date();
                const currentHour = data.find(p => new Date(p.time_start).getHours() === currentTime.getHours());

                if (currentHour) {
                    setCurrentPrice(currentHour);
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Ladataan päivän sähkön hintatietoja...</p>;
    if (error) return <p>Virhe ladattaessa: {error}</p>;

    // Apufunktio pyöristämään hintanäytöt 3 desimaaliin
    const formatPrice = (price) => parseFloat(price).toFixed(3);

    // Määritetään kaavion data ja asetukset
    const chartData = {
        labels: prices.map(p =>
            new Date(p.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })
        ),
        datasets: [
            {
                label: "Sähkön hinta (snt/kWh)",
                data: prices.map(p => formatPrice(p.EUR_per_kWh * 100)), // Muutetaan euroista senteiksi ja pyöristetään 3 desimaaliin
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                fill: true,
                order: 1 // Varmistaa, että tämä on taustalla
            },
            {
                label: "Nykyhetken hinta",
                data: prices.map(p => (new Date(p.time_start).getHours() === new Date().getHours() ? formatPrice(p.EUR_per_kWh * 100) : null)),
                borderColor: "red",
                pointBackgroundColor: "red",
                pointBorderColor: "black", // Musta reunus, jotta näkyy paremmin
                pointRadius: 8, // Suurempi koko
                pointHoverRadius: 10, // Kasvaa hoverilla
                fill: false,
                type: "scatter",
                order: 2 // Varmistaa, että tämä on päällä
            }
        ]
    };
    

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    stepSize: 5 // Asetetaan akselin pykälät tasaisiksi (5 snt, 10 snt jne.)
                }
            }
        },
        elements: {
            point: {
                z: 10 // Asetetaan punainen pallo korkeimmalle tasolle
            }
        }
    };
    

    return (
        <div className="sahko-nakyma">
            <h3>Päivän sähkön hintatiedot</h3>
            <p><strong>Nykyhetken hinta:</strong> {currentPrice ? `${new Date(currentPrice.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}: ${formatPrice(currentPrice.EUR_per_kWh * 100)} snt/kWh` : "Ei saatavilla"}</p>
            <p><strong>Halvin tunti:</strong> {new Date(lowestPrice.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}: {formatPrice(lowestPrice.EUR_per_kWh * 100)} snt/kWh</p>
            <p><strong>Kallein tunti:</strong> {new Date(highestPrice.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}: {formatPrice(highestPrice.EUR_per_kWh * 100)} snt/kWh</p>
            <h4>Sähkön hinnan kehitys päivän aikana</h4>
            <div className="kaavio-container">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
    
    
};

export default NoudaHinta;
