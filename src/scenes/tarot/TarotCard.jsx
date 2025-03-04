import React, { useState, useEffect } from "react";

const getDailyCard = () => {
    const today = new Date().toISOString().split("T")[0];
    const storedCard = localStorage.getItem("dailyTarotCard");

    if (storedCard) {
        const { date, card } = JSON.parse(storedCard);
        if (date === today) return card;
    }
    
    const randomCard = tarotMeanings[Math.floor(Math.random() * tarotMeanings.length)];
    localStorage.setItem("dailyTarotCard", JSON.stringify({ date: today, card: randomCard }));
    return randomCard;
};

const TarotCard = () => {
    const [card, setCard] = useState(null);

    useEffect(() => {
        setCard(getDailyCard());
    }, []);

    if (!card) return <p className="loading-message">Loading Tarot card of the day...</p>

    return (
        <div className="tarot">
            <div className="tarot-reading-container">
                <h1>Your Daily Tarot Card Reading</h1>
                <div className="tarot-card">
                    <div className="tarot-card-image">
                        <img src={card.image} alt={card.name} />
                    </div>
                    <div className="tarot-card-texts">
                        <h2>{card.name}</h2>
                        <h4>{card.meaning}</h4>
                        <p>{card.reading}</p>
                    </div>
                </div>
            </div>
        </div>
    ); 
};

export default TarotCard;