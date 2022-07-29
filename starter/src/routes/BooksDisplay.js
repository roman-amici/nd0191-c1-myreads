import BookShelf from "../components/BookShelf";
import { getAll } from "../BooksAPI";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const shelves = [
  { name: "currentlyReading", title: "Currently Reading" },
  { name: "wantToRead", title: "Want to Read" },
  { name: "read", title: "Read" }]

export default function BooksDisplay({ setShowSearchpage, moveBookToShelf }) {

  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const books = await getAll();
      setBooks(books);
    }
    getBooks();
  }, []);

  const replaceBook = (book, shelf) => {
    const updatedBook = {
      ...book,
      shelf
    };
    const updatedBooks = books.map((b) => {
      if (b.id === updatedBook.id) {
        return updatedBook;
      }
      else {
        return b;
      }
    });
    setBooks(updatedBooks);
  }

  const onBookMovedToShelf = async (book, shelf) => {
    await moveBookToShelf(book, shelf);
    replaceBook(book, shelf);
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(({ name, title }) => {
            const shelfBooks = books.filter((book) => book.shelf === name);
            return (
              <BookShelf
                shelfTitle={title}
                books={shelfBooks}
                key={name}
                shelfName={name}
                moveBookToShelf={onBookMovedToShelf} />
            )
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}