import "./App.css";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelfList from "./components/BookShelfList";

function App() {
  const [allBooks, setAllBooks] = useState([]);

  function addBookToShelfs(shelf, book) {
    if (shelf === "none") {
      return setAllBooks((oldList) =>
        oldList.filter((existingBook) => existingBook.id !== book.id)
      );
    }

    book.shelf = shelf;
    setAllBooks((oldList) => {
      const deletet = oldList.filter(
        (existingBook) => existingBook.id !== book.id
      );

      return [...deletet, book];
    });
  }

  async function getAllBooks() {
    const res = await BooksAPI.getAll();
    res.forEach((book) => {
      addBookToShelfs(book.shelf, book);
    });
    setAllBooks(res);
  }

  useEffect(() => {
    getAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/search"
          element={<Search addBookToShelfs={addBookToShelfs} />}
        />
        <Route
          exact
          path="/"
          element={
            <BookShelfList
              allBooks={allBooks}
              addBookToShelfs={addBookToShelfs}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
