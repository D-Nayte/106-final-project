import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import * as BooksAPI from "../BooksAPI";

const Search = ({ allBooks, addBookToShelfs }) => {
  const [query, setQuery] = useState("");
  const [newBookList, setNewBookList] = useState([]);

  async function searchBooks(text) {
    setQuery(text);
    const newBooks = await BooksAPI.search(query);
    setNewBookList(newBooks);
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
              value={query}
              onChange={(e) => searchBooks(e.target.value)}
              placeholder="Search by title, author, or ISBN"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {newBookList &&
              Array.isArray(newBookList) &&
              newBookList?.map((book) => {
                return (
                  <li key={book.id}>
                    <BookCard book={book} addBookToShelfs={addBookToShelfs} />
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Search;
