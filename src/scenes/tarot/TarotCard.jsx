import { useState, useEffect } from "react"; // Imports hooks (useState, useEffect) for managing state and side effects in the component
import tarotMeanings from "./meanings";      // Imports the tarotMeanings array
import './TarotCard.css';                    // Imports the CSS styles to the Tarot scene
import background from './background.jpg';
import Container from "../../components/container/Container";

/**
 * Get the daily Tarot card. It checks if the card for today
 * is already stored in localStorage, or generates a new one
 * if not.
 *
 * @returns {object}
 * Object containing data of selected Tarot card.
 *
 * @author Mirva Kortelainen
 */
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

/**
 * Find out the tarot card's true path.
 *
 * @param {string} name
 * Name of the image in deck folder.
 * @returns {string}
 * Real path to the image.
 */
function getImageUrl(name) {
  let path = `./deck/${name}`;
  return new URL(path, import.meta.url).href;
}

/**
 * Main component for displaying the daily Tarot card.
 *
 * @component
 * @author Mirva Kortelainen
 */
const TarotCard = () => {
  const [card, setCard] = useState(null); // Initializes state for the card, which is initially set to null

  // Runs once when the component is mounted to fetch and set the daily Tarot card
  useEffect(() => {
    setCard(getDailyCard()); // Sets the Tarot card when the component is mounted, calling getDailyCard() to fetch the card
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // If no Tarot card is available yet, a loading message is displayed
  if (!card) return <p className="loading-message">Loading Tarot card of the day...</p>

  // Get the url of the card image.
  let image = getImageUrl(card.image);

  // Returns the structure for displaying the daily Tarot card reading
  return (
    <Container className="tarot" backgroundImage={background}>
      <div className="tarot-reading-container">
        <h1>Your Daily Tarot Card Reading</h1>
        <div className="tarot-card">
          <div className="tarot-card-image">
            <img src={image} alt={card.name} />
          </div>
          <div className="tarot-card-texts">
            <h2>{card.name}</h2>
            <h4>{card.meaning}</h4>
            <p>{card.reading}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TarotCard;