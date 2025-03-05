import React, { useState, useEffect } from "react";
import { orientations } from "../../utils/types"   // screen orientation type
import './Book.css'

const Book = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await fetch("https://gutendex.com/books");
      const data = await response.json();
      const randomBook = data.results[Math.floor(Math.random() * data.results.length)];
      setBook(randomBook);
      localStorage.setItem("book", JSON.stringify(randomBook));
      localStorage.setItem("lastFetch", Date.now().toString());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the book data:", error);
      setLoading(false); // stop loading in case of error
    }
  };

  useEffect(() => {
    const storedBook = localStorage.getItem("book");
    const lastFetch = localStorage.getItem("lastFetch");
    const oneDay = 24 * 60 * 60 * 1000;

    if (storedBook && lastFetch && Date.now() - parseInt(lastFetch, 10) < oneDay) {
      setBook(JSON.parse(storedBook));
      setLoading(false);
    } else {
      fetchBooks();
    }
  }, []);

  return (
    <div className="container">
      <h1>Book of the day</h1>
      <p>Project Gutenberg free e-book</p>
      {loading && <p>Loading...</p>}
      {book && (
        <div>
          <h2>Random Book:</h2>
          <p>{book.title}</p>
          <p>by {book.authors.map((author) => author.name).join(", ")}</p>
          {book.formats && book.formats["image/jpeg"] && (
            <div>
              <img src={book.formats["image/jpeg"]} alt={book.title} style={{ width: "200px" }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Book;