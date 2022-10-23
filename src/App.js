import "./App.css";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelfList from "./components/BookShelfList";

function App() {
  const [allBooks, setAllBooks] = useState([]);

  function addBookToShelfs(shelf, book) {
    const newBookList = allBooks.filter((exemp) => exemp.id !== book.id);
    if (shelf !== "none") {
      book.shelf = shelf;
      newBookList.push(book);
    }

    setAllBooks((old) => newBookList);
    BooksAPI.update(book, shelf);
  }

  async function getAllBooks() {
    const res = await BooksAPI.getAll();
    setAllBooks((old) => res);
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
          element={
            <Search addBookToShelfs={addBookToShelfs} allBooks={allBooks} />
          }
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
