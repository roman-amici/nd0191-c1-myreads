import BooksGrid from "./BooksGrid";

export default function BookShelf({ shelfTitle, books, moveBookToShelf }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <BooksGrid
          books={books}
          moveBookToShelf={moveBookToShelf} />
      </div>
    </div>)
}