import BookShelf from "../components/BookShelf";

import { Link } from "react-router-dom";

const shelves = [
  { name: "currentlyReading", title: "Currently Reading" },
  { name: "wantToRead", title: "Want to Read" },
  { name: "read", title: "Read" }]

export default function BooksDisplay({ books, moveBookToShelf }) {

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
                moveBookToShelf={moveBookToShelf} />
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