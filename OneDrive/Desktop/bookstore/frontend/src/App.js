import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/books";  // Pointing to the backend server

function App() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({ title: "", author: "", price: "" });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch books from the backend
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Add a new book to the backend
  const addBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, book);
      setBooks([...books, response.data]);
      setBook({ title: "", author: "", price: "" });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Edit an existing book
  const editBook = (book) => {
    setEditing(true);
    setCurrentId(book._id);
    setBook(book);
  };

  // Update book information
  const updateBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/${currentId}`, book);
      setBooks(
        books.map((b) => (b._id === currentId ? { ...b, ...response.data } : b))
      );
      setEditing(false);
      setBook({ title: "", author: "", price: "" });
      setCurrentId(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h1>📚 Bookstore App</h1>
      <h2>Books List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} - {book.author} (${book.price}){" "}
            <button onClick={() => editBook(book)}>Edit</button>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>{editing ? "Edit Book" : "Add New Book"}</h2>
      <form onSubmit={editing ? updateBook : addBook}>
        <input
          type="text"
          placeholder="Title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={book.price}
          onChange={(e) => setBook({ ...book, price: e.target.value })}
          required
        />
        <button type="submit">{editing ? "Update Book" : "Add Book"}</button>
      </form>
    </div>
  );
}

export default App;
