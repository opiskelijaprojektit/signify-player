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
                label: "",
                data: prices.map(p => formatPrice(p.EUR_per_kWh * 100)), 
                borderColor: "blue",
                backgroundColor: "rgba(10, 10, 147, 0.67)",
                fill: true,
                tension: 0.5,
                order: 2
            },
            {
                label: "",
                data: prices.map(p => (new Date(p.time_start).getHours() === new Date().getHours() ? formatPrice(p.EUR_per_kWh * 100) : null)),
                borderColor: "red",
                pointBackgroundColor: "red",
                pointBorderColor: "black",
                pointRadius: 8,
                pointHoverRadius: 10,
                fill: false,
                type: "scatter",
                order: 1 //punainen piste näkyviin paremmin
            }
        ]
    };
    
    
    
    
//Kaavion tekstien ja viivojen väriasetukset
    const chartOptions = { 
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: "white",
                    font: {
                        size: 14,
                        weight: "bold"
                    }
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.5)"
                }
            },
            y: {
                beginAtZero: false,
                ticks: {
                    stepSize: 5,
                    color: "white",
                    font: {
                        size: 14,
                        weight: "bold"
                    }
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.5)"
                }
            }
        },
        plugins: {
            legend: {
                display: false // **Poistaa kaikki otsikot**
            }
        }
    };
    
    
    
    
    
    
    
    

    

return (
    <div className="sahko-container">
        {/* Kaavio ylimpänä */}
        <div className="kaavio-container">
            <Line data={chartData} options={chartOptions} />
        </div>

        {/* Otsikko ja hintatiedot vierekkäin */}
        <div className="ylaosa">
            <h2 className="otsikko">Sähkön hinta tänään {new Date().toLocaleDateString("fi-FI")}</h2>
            <div className="hintatiedot">
                <p><strong>Nykyhetken hinta:</strong> {currentPrice ? `${new Date(currentPrice.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}: ${formatPrice(currentPrice.EUR_per_kWh * 100)} snt/kWh` : "Ei saatavilla"}</p>
                <p><strong>Halvin tunti:</strong> {new Date(lowestPrice.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}: {formatPrice(lowestPrice.EUR_per_kWh * 100)} snt/kWh</p>
                <p><strong>Kallein tunti:</strong> {new Date(highestPrice.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}: {formatPrice(highestPrice.EUR_per_kWh * 100)} snt/kWh</p>
            </div>
        </div>
    </div>
);

    
    
    
    
    
};

export default NoudaHinta;
