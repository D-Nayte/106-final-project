import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import * as BooksAPI from "../BooksAPI";

const Search = ({ addBookToShelfs, allBooks }) => {
  const [newBookList, setNewBookList] = useState([]);
  const [query, setQuery] = useState("");

  async function searchBooks() {
    const newBooks = await BooksAPI.search(query.trim().toLocaleLowerCase());
    if (newBooks && newBooks.error !== "empty query") {
      const formattedBookList = newBooks.map((exemp) => {
        const foundBook = allBooks.find((book) => book.id === exemp.id);
        if (foundBook) {
          return foundBook;
        }
        return exemp;
      });
      return setNewBookList((old) => [...formattedBookList]);
    }
    if (!query || newBooks.error === "empty query")
      return setNewBookList((old) => old.filter((e) => false));
  }

  useEffect(() => {
    searchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            <div href="#2">Close</div>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="Search by title, author, or ISBN"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {newBookList && newBookList.length > 0
              ? newBookList.map((book) => {
                  return (
                    <li key={book.id}>
                      <BookCard book={book} addBookToShelfs={addBookToShelfs} />
                    </li>
                  );
                })
              : null}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Search;
