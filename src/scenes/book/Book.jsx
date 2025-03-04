import { orientations } from "../../utils/types"   // screen orientation type
import './Book.css'
import React from "react";

function Book (props) {
  
    // Variable to store the url address.
    let url;
  
    // Select the image to be used based on the screen orientation.
    // By default, a landscape image is used.
    switch (props.orientation) {
      case orientations.landscape:
        url = props.url.landscape
        break
      case orientations.portrait:
        url = props.url.portrait
        break
      default:
        url = props.url.landscape
    }
  
    // Return image as an img-element.
  return (
      <img className="scene_book" src={import.meta.env.VITE_API_ADDRESS + url} />
    )  
  }

  const Book = () => {
  // State to store book data
  const [book, setBook] = useState(null);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch('https://openlibrary.org/works/OL257943W.json')  // Open Library API URL
      .then((response) => {
        if (!response.ok) {
          // If the response is not ok, throw an error
          throw new Error('Network response was not ok');
        }
        return response.json(); // Convert the response to JSON
      })
      .then((data) => {
        setBook(data); // Store the data in the book state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error); // Set error state if an error occurs
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []); // Empty array means this effect runs only once when the component mounts

  if (loading) {
    return <p>Loading...</p>; // Show loading message if still fetching data
  }

  if (error) {
    return <p>Error fetching book: {error.message}</p>; // Show error message if there was an error
  }

  // Safely extract author name
  const author = book && book.authors && book.authors.length > 0 ? book.authors[0].name : 'Unknown author';
  
  // Handle cover image URL dynamically
  const coverImageUrl = book && book.covers && book.covers.length > 0 
    ? `https://covers.openlibrary.org/b/OLID/${book.covers[0]}-L.jpg`
    : 'https://via.placeholder.com/150?text=No+Cover+Available'; // Fallback image if no cover

  return (
    <div className="container">
      <h1>Book Details</h1>
      {book && (
        <div className="book-details">
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {author}</p>
          <div className="cover-image">
            <img src={coverImageUrl} alt={`${book.title} cover`} />
          </div>
        </div>
      )}
    </div>
  );
  }
  
export default Book;