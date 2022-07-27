import "./App.css";
import { useState, useEffect } from "react";
import BooksSearch from "./components/BooksSearch";
import BookShelf from "./components/BookShelf";
import { getAll, update } from "./BooksAPI";

const shelves = [
  { name: "currentlyReading", title: "Currently Reading" },
  { name: "wantToRead", title: "Want to Read" },
  { name: "read", title: "Read" }]

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
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

  const moveBookToShelf = async (book, shelf) => {
    // TODO: use the result of update to change the status of the books?
    await update(book, shelf);
    replaceBook(book, shelf);
  }

  return (
    <div className="app">
      {showSearchPage ? <BooksSearch setShowSearchpage={setShowSearchpage} />
        : (
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
                      moveBookToShelf={moveBookToShelf} />
                  )
                })}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
