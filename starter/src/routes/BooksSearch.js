import { useState } from "react";
import { search } from "../BooksAPI";
import BooksGrid from "../components/BooksGrid";
import { Link } from "react-router-dom";

export default function BooksSearch({ moveBookToShelf, bookShelfLookup }) {
  const [state, setState] = useState({ query: "", books: [] });

  const searchForBooks = async (query) => {
    let books = [];
    if (query) {
      books = await search(query) ?? [];
    }

    if (books.error) {
      books = [];
    }

    // Only update the books with the result if its still relevant to the current query
    // This prevents a bug where an old result would override the current query if the
    // search was slow to return.
    setState(state => {
      if (state.query !== query) {
        return state;
      } else {
        return { ...state, books };
      }
    });
  }

  const updateQuery = (query) => {
    setState(state => ({ ...state, query }));
    searchForBooks(query);
  }

  // Books from search results don't come with current shelf information,
  // so add it in before passing it to the component.
  const booksWithShelves = state.books.map(book => (
    bookShelfLookup[book.id]
      ? { ...book, shelf: bookShelfLookup[book.id] }
      : book
  ));

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          className="close-search"
          to="/"
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={state.query}
            onChange={(e) => updateQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BooksGrid
          books={booksWithShelves}
          moveBookToShelf={moveBookToShelf}
        />
      </div>
    </div>
  )
}