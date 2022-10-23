import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import * as BooksAPI from "../BooksAPI";

const Search = ({ addBookToShelfs, allBooks }) => {
  const [newBookList, setNewBookList] = useState([]);

  async function searchBooks(text) {
    const newBooks = await BooksAPI.search(text);
    if (newBooks && Array.isArray(newBooks)) {
      setNewBookList(() => {
        const notOwned = newBooks.map((exemp) => {
          const foundBook = allBooks.find((book) => book.id === exemp.id);
          if (foundBook) {
            return foundBook;
          }
          return exemp;
        });
        return notOwned;
      });
    }
    if (!text) return setNewBookList([]);
  }

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
              onChange={(e) => searchBooks(e.target.value)}
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
