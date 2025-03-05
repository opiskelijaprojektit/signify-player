import React, { useState, useEffect } from "react";
import { orientations } from "../../utils/types"   // screen orientation type
import './Book.css'

const Book = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://gutendex.com/books/84/") // Replace with the desired book ID
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // Log the fetched data to see its structure
        setBook(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load book data.");
      });
  }, []);

  return (
    <div className="container">
      <h1>Book of the day</h1>
      <p>Project Gutenberg free e-book</p>
      <div>
        {error ? (
          <p>{error}</p>
        ) : book ? (
          <div>
            <h2>{book.title}</h2>
            <p>{book.authors ? book.authors.map((author) => author.name).join(", ") : "Unknown author"}</p>
            { book.formats&& book.formats["image/jpeg"] && (
              <div>
                <img src={book.formats["image/jpeg"]} alt={book.title} style={{ width: "200px" }} />
              </div>
            )}
          </div>
        ) : (
          <p>Loading book...</p>
        )}
      </div>
    </div>
  );
};

export default Book;