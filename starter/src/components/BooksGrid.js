import Book from "./Book";

export default function BooksGrid({ books, moveBookToShelf }) {
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book book={book} moveBookToShelf={moveBookToShelf} />
        </li>
      ))}
    </ol>)
}