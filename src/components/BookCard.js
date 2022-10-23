import React, { useEffect, useState } from "react";

const BookCard = ({ book, addBookToShelfs }) => {
  const { authors, title, imageLinks } = book;
  const { smallThumbnail } = imageLinks;
  const [shelf, setShelf] = useState(book.shelf);

  function switchBook(value, exemplar) {
    addBookToShelfs(value, exemplar);
  }

  useEffect(() => {
    if (!book.shelf) {
      setShelf("none");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url("${smallThumbnail}")`,
          }}></div>
        <div className="book-shelf-changer">
          <select
            value={shelf}
            onChange={(e) => switchBook(e.target.value, book)}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
};

export default BookCard;
