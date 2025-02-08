import React, { useEffect, useState } from "react";

const NoudaHinta = () => {
    const [lowestPrice, setLowestPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date().toISOString().split("T")[0]; // Muoto YYYY-MM-DD
                const response = await fetch(`https://www.sahkonhintatanaan.fi/api/v1/prices/${today.split("-")[0]}/${today.split("-")[1]}-${today.split("-")[2]}.json`);

                if (!response.ok) {
                    throw new Error("Virhe ladattaessa sähkön hintaa");
                }

                const data = await response.json();

                if (data.length === 0) {
                    throw new Error("Hintatietoja ei saatavilla");
                }

                // Etsitään halvin tunti
                const minPrice = data.reduce((min, p) => p.EUR_per_kWh < min.EUR_per_kWh ? p : min, data[0]);

                setLowestPrice(minPrice);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Ladataan päivän halvinta sähkön hintaa...</p>;
    if (error) return <p>Virhe ladattaessa: {error}</p>;

    return (
        <div>
            <h3>Nykyisen päivän halvin sähkön hinta</h3>
            <p>{new Date(lowestPrice.time_start).toLocaleTimeString("fi-FI", { hour: '2-digit', minute: '2-digit' })}: {lowestPrice.EUR_per_kWh * 100} snt/kWh</p>
        </div>
    );
};

export default NoudaHinta;
