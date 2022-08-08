import "./App.css";
import BooksSearch from "./routes/BooksSearch";
import { update } from "./BooksAPI";
import BooksDisplay from "./routes/BooksDisplay";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { getAll } from "./BooksAPI";
import { useState, useEffect } from 'react'

function createBookshelfLookup(books) {
  const bookShelfLookup = {};

  for (let book of books) {
    bookShelfLookup[book.id] = book.shelf;
  }

  return bookShelfLookup;
}

function App() {

  const [shelvedBooks, setShelvedBooks] = useState([]);
  useEffect(() => {
    const getShelvedBooks = async () => {
      const books = await getAll();
      setShelvedBooks(books);
    }
    getShelvedBooks();
  }, []);

  const updateShelvedBooks = (book) => {
    let exists = false;
    let newShelvedBooks = shelvedBooks.map(b => {
      if (b.id === book.id) {
        exists = true;
        return book;
      }
      else {
        return b;
      }
    });
    // Add the new book to the shelf if its not already there
    if (!exists) {
      newShelvedBooks = newShelvedBooks.concat([book]);
    }
    setShelvedBooks(newShelvedBooks);
  };

  const moveBookToShelf = async (book, shelf) => {
    // Optimistically update the state
    const newBook = { ...book, shelf };
    updateShelvedBooks(newBook);
    await update(book, shelf);
  }

  // Allow for fast lookup of what book belongs to what shelf
  const bookShelfLookup = createBookshelfLookup(shelvedBooks);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksDisplay books={shelvedBooks} moveBookToShelf={moveBookToShelf} />} />
        <Route path="/search" element={<BooksSearch bookShelfLookup={bookShelfLookup} moveBookToShelf={moveBookToShelf} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
