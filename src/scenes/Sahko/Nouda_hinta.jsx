import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Automaattinen konfigurointi Chart.js:lle

const NoudaHinta = () => {
    const [prices, setPrices] = useState([]);
    const [lowestPrice, setLowestPrice] = useState(null);
    const [highestPrice, setHighestPrice] = useState(null);
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

                // Tallennetaan kaikki päivän hinnat
                setPrices(data);

                // Etsitään päivän halvin ja kallein tunti ilman pyöristyksiä
                const minPrice = data.reduce((min, p) => (p.EUR_per_kWh < min.EUR_per_kWh ? p : min), data[0]);
                const maxPrice = data.reduce((max, p) => (p.EUR_per_kWh > max.EUR_per_kWh ? p : max), data[0]);

                setLowestPrice(minPrice);
                setHighestPrice(maxPrice);
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

    // Määritetään kaavion data ja asetukset
    const chartData = {
        labels: prices.map(p =>
            new Date(p.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })
        ),
        datasets: [
            {
                label: "Sähkön hinta (snt/kWh)",
                data: prices.map(p => p.EUR_per_kWh * 100), // Muutetaan euroista senteiksi
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                fill: true
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
        }
    };

    return (
        <div>
            <h3>Päivän sähkön hintatiedot</h3>
            <p><strong>Halvin tunti:</strong> {new Date(lowestPrice.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}: {lowestPrice.EUR_per_kWh * 100} snt/kWh</p>
            <p><strong>Kallein tunti:</strong> {new Date(highestPrice.time_start).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}: {highestPrice.EUR_per_kWh * 100} snt/kWh</p>
            <h4>Sähkön hinnan kehitys päivän aikana</h4>
            <div style={{ height: "300px", width: "100%" }}>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default NoudaHinta;
