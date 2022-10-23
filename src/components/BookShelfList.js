import Bookshelf from "./Bookshelf";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BookShelfList = ({ addBookToShelfs, allBooks }) => {
  const [bookShelfs, setBookShelfs] = useState([]);

  function getShelfList() {
    const rawShelfList = allBooks.map((book) => book.shelf);
    const shelfList = [...new Set(rawShelfList)];
    const bookShelfs = shelfList.map((shelf) => {
      const shelfName = shelf;
      const shelfTitle = getTitel(shelf);
      const books = allBooks.filter((book) => book.shelf === shelf);
      return { shelfName, shelfTitle, books };
    });
    setBookShelfs(bookShelfs);
  }

  function getTitel(shelf) {
    const titelList = shelf.split(/(?=[A-Z])/);
    const fomattedTitelList = titelList.map((term, i) => {
      if (titelList.length >= 3 && i === 1) {
        const newTerm = term[0].toLowerCase() + term.slice(1);
        return newTerm;
      }
      const newTerm = term[0].toUpperCase() + term.slice(1);
      return newTerm;
    });
    return fomattedTitelList.join(",").replaceAll(",", " ");
  }

  useEffect(() => {
    getShelfList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allBooks]);

  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelfs.map((bookShelf) => {
              const { books, shelfTitle } = bookShelf;
              return (
                <Bookshelf
                  key={shelfTitle}
                  title={shelfTitle}
                  books={books}
                  addBookToShelfs={addBookToShelfs}
                />
              );
            })}
          </div>
        </div>
        <Link className="open-search" to="/search">
          <div>Add a book</div>
        </Link>
      </div>
    </div>
  );
};

export default BookShelfList;
