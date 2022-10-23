import BookCard from "./BookCard";

const Bookshelf = ({ title, books, addBookToShelfs }) => {
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books &&
              books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  addBookToShelfs={addBookToShelfs}
                />
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
