import React from "react";
import "../styles/BookList.css";

interface Book {
  id: number;
  name: string;
  author: string;
  category: string;
  image: string;
}

interface Props {
  books: Book[];
}

export default function BookList({ books }: Props) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <img src={book.image} alt={book.name} />
          <h4>{book.name}</h4>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}
