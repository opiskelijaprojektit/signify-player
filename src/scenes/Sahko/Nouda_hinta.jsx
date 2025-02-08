import React, { useEffect, useState } from "react";

const NoudaHinta = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 🔹 Testidata – tämä vaihdetaan oikeaan API-kutsuun myöhemmin
        const testData = [
            { time: "00:00", price: 10.5 },
            { time: "06:00", price: 12.3 },
            { time: "12:00", price: 14.2 },
            { time: "18:00", price: 11.8 },
            { time: "23:59", price: 9.7 }
        ];

        // Simuloidaan API-kutsua (tämä korvataan oikealla haulla)
        setTimeout(() => {
            setPrices(testData);
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) return <p>Ladataan päivän sähkön hintoja...</p>;
    if (error) return <p>Virhe ladattaessa: {error}</p>;

    return (
        <div>
            <h3>Päivän sähkön hinnat</h3>
            <ul>
                {prices.map((item, index) => (
                    <li key={index}>
                        {item.time}: {item.price} c/kWh
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoudaHinta;
