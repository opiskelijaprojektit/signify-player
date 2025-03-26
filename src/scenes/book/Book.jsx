import { useState, useEffect } from "react";
import { orientations } from "../../utils/types"   // screen orientation type
import './Book.css'
import backgroundImage from './kirjahylly.jpg'
import Container from "../../components/container/Container";

const Book = (props) => {

  const [book, setBook] = useState(null);       // State for storing the fetched book
  const [loading, setLoading] = useState(true); // State for managing loading status

  // Function to fetch book data from the API
  const fetchBooks = async () => {
    try {
      const response = await fetch("https://gutendex.com/books"); // Fetch book data from API
      const data = await response.json(); // Convert response to JSON
      const randomBook = data.results[Math.floor(Math.random() * data.results.length)]; // Get a random book from results
      setBook(randomBook); // Set the selected book in state
      localStorage.setItem("book", JSON.stringify(randomBook)); // Store the book data in local storage
      localStorage.setItem("bookLastFetch", Date.now().toString()); // Store the fetch timestamp in local storage
      setLoading(false); // End loading state
    } catch (error) {
      console.error("Error fetching the book data:", error); // Log error if fetching fails
      setLoading(false); // End loading state in case of error
    }
  };

  // useEffect hook runs when the component mounts
  useEffect(() => {
    const storedBook = localStorage.getItem("book"); // Retrieve stored book data from local storage
    const lastFetch = localStorage.getItem("bookLastFetch"); // Retrieve last fetch timestamp from local storage
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Check if the stored book data is still valid (i.e., less than one day old)
    if (storedBook && lastFetch && Date.now() - parseInt(lastFetch, 10) < oneDay) {
      setBook(JSON.parse(storedBook)); // Use stored book data
      setLoading(false); // End loading state
    } else {
      // Fetch new book data if no valid stored data is found
      fetchBooks();
    }
  }, []); // Empty dependency array ensures this runs only once when component mounts

 return (
   
  <Container className="book" backgroundImage={backgroundImage}>
      <div className={props.orientation == orientations.landscape ? "book_screen book-landscape" : "book_screen book-portrait"}>
        { // If orientation is landscape then add empty div element.
          // This will ensure that the content appears in the right
          // half of the screen.
          props.orientation == orientations.landscape && <div></div> }
        </div>
    
  <div className="book-container">
    
      <h1>Book of the day</h1>
      {loading ? <p>Loading...</p> : null} {/* Show loading message while data is being fetched */}
      {book && (
  <div className="book-details">
          <p>Random Book:</p>
          <h2>{book.title}</h2>
          <h2>by {book.authors.map((author) => author.name).join(", ")}</h2> {/* Display book authors */}
          {book.formats && book.formats["image/jpeg"] && (
  <div className="cover-image">
          <img src={book.formats["image/jpeg"]} alt={book.title} style={{ width: "200px" }} /> {/* Display book cover image */}
            </div>
          )}
  <footer className="site-details">
    <br></br>
    <p>This e-book is from Project Gutenberg.</p>
  </footer>
        </div>
      )}
     </div>
    </Container>
  );
};

export default Book;