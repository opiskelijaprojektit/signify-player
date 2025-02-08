import React, { useEffect, useState, useRef } from "react";

const NoudaHinta = () => {
    const [prices, setPrices] = useState([]);
    const [lowestPrice, setLowestPrice] = useState(null);
    const [highestPrice, setHighestPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const canvasRef = useRef(null);

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
                const minPrice = data.reduce((min, p) => p.EUR_per_kWh < min.EUR_per_kWh ? p : min, data[0]);
                const maxPrice = data.reduce((max, p) => p.EUR_per_kWh > max.EUR_per_kWh ? p : max, data[0]);

                setLowestPrice(minPrice);
                setHighestPrice(maxPrice);
                setLoading(false);

                // Piirretään kaavio uusilla tiedoilla
                drawChart(data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const drawChart = (data) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        // Tyhjennetään canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const chartWidth = canvas.width - 40; // Kaavion leveys
        const chartHeight = canvas.height - 40; // Kaavion korkeus
        const padding = 20;

        // Haetaan hinnat ilman pyöristyksiä
        const maxPrice = Math.max(...data.map(p => p.EUR_per_kWh * 100));
        const minPrice = Math.min(...data.map(p => p.EUR_per_kWh * 100));

        // Pyöristetään akselin pykälät lähimpään 5 snt:iin
        const roundedMax = Math.ceil(maxPrice / 5) * 5;
        const roundedMin = Math.floor(minPrice / 5) * 5;

        const scaleX = chartWidth / data.length; // X-akselin asteikko
        const scaleY = chartHeight / (roundedMax - roundedMin); // Y-akselin asteikko

        // Piirretään hintakäyrä ilman pyöristyksiä
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;

        data.forEach((point, index) => {
            const x = padding + index * scaleX;
            const y = canvas.height - padding - (point.EUR_per_kWh * 100 - roundedMin) * scaleY;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Piirretään akselit
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Lisätään hintamerkinnät tasaisilla pykälillä (5 snt välein)
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        for (let price = roundedMin; price <= roundedMax; price += 5) {
            const y = canvas.height - padding - (price - roundedMin) * scaleY;
            ctx.fillText(`${price} snt/kWh`, 5, y + 5);
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
        }
    };

    if (loading) return <p>Ladataan päivän sähkön hintatietoja...</p>;
    if (error) return <p>Virhe ladattaessa: {error}</p>;

    return (
        <div>
            <h3>Päivän sähkön hintatiedot</h3>
            <p><strong>Halvin tunti:</strong> {new Date(lowestPrice.time_start).toLocaleTimeString("fi-FI", { hour: '2-digit', minute: '2-digit' })}: {lowestPrice.EUR_per_kWh * 100} snt/kWh</p>
            <p><strong>Kallein tunti:</strong> {new Date(highestPrice.time_start).toLocaleTimeString("fi-FI", { hour: '2-digit', minute: '2-digit' })}: {highestPrice.EUR_per_kWh * 100} snt/kWh</p>
            <h4>Sähkön hinnan kehitys päivän aikana</h4>
            <canvas ref={canvasRef} width={500} height={300} style={{ border: "1px solid black" }}></canvas>
        </div>
    );
};

export default NoudaHinta;
