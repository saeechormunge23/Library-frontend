import React, { useEffect, useState } from "react";
import bookServices from "../services/bookServices";
import Navbar from "../Navbar";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState("");
  const [book, setBook] = useState(null);

  useEffect(() => {
    bookServices.getAllBooks().then((response) => setBooks(response.data));
  }, []);

  const fetchBookByIsbn = async () => {
    try {
      const response = await bookServices.getBookByIsbn(isbn);
      setBook(response.data);
      setError(""); // Clear error if successful
    } catch (error) {
      setBook(null); // Clear book data on error
      setError("Book not found. Please check the ISBN and try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBookByIsbn();
  };

  return (
    <>
      <Navbar />
      <div className="user-dashboard">
        <h2>User Dashboard</h2>
        {/* Search for a book by ISBN */}
        <form onSubmit={handleSubmit} className="isbn-form">
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter ISBN"
            required
            className="isbn-input"
          />
          <button type="submit" className="fetch-button">
            Fetch Book
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {book && (
          <div className="book-info">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Description:</strong> {book.description}
            </p>
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="book-image"
              />
            )}
          </div>
        )}
        {/* You can also display the list of all books here if needed */}
        <h3>All Books</h3>
        <ul className="book-list">
          {books.map((b) => (
            <li key={b.id}>
              <span className="book-title">{b.title}</span>
              <span className="book-author">by {b.author}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserDashboard;
