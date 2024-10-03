// src/components/AdminDashboard.js

import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import bookServices from "../services/bookServices"; // Import book service for API calls
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import "./AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); // Store book to edit or add
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publicationYear: "",
  });

  // Fetch all books
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await bookServices.getAllBooks(); // Fetch the list of books
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books.");
    }
  };

  // Handle input change in form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Show modal for adding/updating book
  const handleShowModal = (book = null) => {
    setCurrentBook(book); // If book exists, we are editing; otherwise adding a new one
    if (book) {
      setFormData(book); // Pre-fill form if editing
    } else {
      setFormData({
        title: "",
        author: "",
        isbn: "",
        publicationYear: "",
      });
    }
    setShowModal(true);
  };

  // Hide modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentBook(null);
  };

  // Add or update book
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentBook) {
      // Update book
      try {
        await bookServices.updateBook(currentBook.isbn, formData);
        toast.success("Book updated successfully!");
        loadBooks(); // Reload books after update
      } catch (error) {
        console.error("Error updating book:", error);
        toast.error("Failed to update book.");
      }
    } else {
      // Add new book
      try {
        await bookServices.addBook(formData);
        toast.success("Book added successfully!");
        loadBooks(); // Reload books after adding
      } catch (error) {
        console.error("Error adding book:", error);
        toast.error("Failed to add book.");
      }
    }
    handleCloseModal();
  };

  // Delete book
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await bookServices.deleteBook(id);
        toast.success("Book deleted successfully!");
        loadBooks(); // Reload books after deletion
      } catch (error) {
        console.error("Error deleting book:", error);
        toast.error("Failed to delete book.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4">Admin Dashboard</h1>
        <Button variant="primary" onClick={() => handleShowModal()}>
          Add New Book
        </Button>

        {/* Book List Table */}
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Publication Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.publicationYear}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShowModal(book)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(book.isbn)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No books available
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Modal for Add/Edit Book */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{currentBook ? "Edit Book" : "Add Book"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Publication Year</Form.Label>
                <Form.Control
                  type="text"
                  name="publicationYear"
                  value={formData.publicationYear}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {currentBook ? "Update Book" : "Add Book"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AdminDashboard;
