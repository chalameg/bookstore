import { Book } from "@/types/Book";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import BookCard from "./BookCard";
import httpService from "@/httpService";

interface Props {
  id: number;
}

const BookDetails: FC<Props> = ({ id }) => {
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await httpService.get(`/books/${id}`);
      console.log(response.data);
      setBook(response.data);
    } catch (error) {
      console.error("Failed to fetch book", error);
    }
  };

  const order = () => {};

  return (
    <div>
      {book && <BookCard book={book} />}
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={order}
      >
        order
      </button>
    </div>
  );
};

export default BookDetails;
