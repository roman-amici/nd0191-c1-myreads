import BookShelfChanger from "./BookShelfChanger";

export default function Book({ book, moveBookToShelf }) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url(${book.imageLinks.smallThumbnail})`
          }}
        ></div>
        <BookShelfChanger
          shelf={book.shelf}
          moveBookToShelf={(shelf) => moveBookToShelf(book, shelf)} />
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors ?
        <div className="book-authors">{book.authors.join("\n")}</div> :
        <></>
      }
    </div>
  )
}