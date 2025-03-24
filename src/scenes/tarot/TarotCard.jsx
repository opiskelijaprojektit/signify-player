import React, { useState, useEffect } from "react"; // Imports React and hooks (useState, useEffect) for managing state and side effects in the component
import tarotMeanings from "./Meanings"; // Imports the tarotMeanings array
import './Tarot.css'; // Imports the CSS styles to the Tarot scene


// This is a function to get the daily Tarot card
// It checks if the card for today is already stored in localStorage, or generates a new one if not
const getDailyCard = () => {
    const today = new Date().toISOString().split("T")[0]; // Gets current date in YYYY-MM-DD format
    const storedCard = localStorage.getItem("dailyTarotCard"); // Retrieves the previously stored Tarot card from localStorage

    // Checks if a stored Tarot card exists in localStorage and if it's for the current day
    if (storedCard) {
        const { date, card } = JSON.parse(storedCard); // Parses the stored Tarot card data
        if (date === today) return card; // Returns the stored Tarot card if it's for the same day
    }
    
    const randomCard = tarotMeanings[Math.floor(Math.random() * tarotMeanings.length)]; // Picks a new Tarot card at random from tarotMeanings array
    localStorage.setItem("dailyTarotCard", JSON.stringify({ date: today, card: randomCard })); // Saves the selected Tarot card and today's date in localStorage
    return randomCard; // Returns the newly selected Tarot card
};

// Main component for displaying the daily Tarot card
const TarotCard = () => {
    const [card, setCard] = useState(null); // Initializes state for the card, which is initially set to null

    // Runs once when the component is mounted to fetch and set the daily Tarot card
    useEffect(() => {
        setCard(getDailyCard()); // Sets the Tarot card when the component is mounted, calling getDailyCard() to fetch the card
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // If no Tarot card is available yet, a loading message is displayed
    if (!card) return <p className="loading-message">Loading Tarot card of the day...</p>

    // Returns the structure for displaying the daily Tarot card reading
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