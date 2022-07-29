import "./App.css";
import BooksSearch from "./routes/BooksSearch";
import { update } from "./BooksAPI";
import BooksDisplay from "./routes/BooksDisplay";
import { Routes, Route, BrowserRouter } from 'react-router-dom';


function App() {

  const moveBookToShelf = async (book, shelf) => {
    await update(book, shelf);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksDisplay moveBookToShelf={moveBookToShelf} />} />
        <Route path="/search" element={<BooksSearch moveBookToShelf={moveBookToShelf} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
