import { Book } from "@/types/Book";
import Link from "next/link";
import React, { FC } from "react";

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  return (
    <div
      className="shadow-lg rounded-lg p-4 flex flex-col items-center w-[80vw] sm:w-[40VW] lg:w-[20VW] 2xl:w-[13VW]"
    >
      <Link href={`books/${book.id}`}>
        <img
          src={book.cover_image_url}
          alt={book.title}
          className="w-full h-64 object-cover rounded-md"
        />
      </Link>
      <h2 className="mt-2 text-lg font-bold">{book.title}</h2>
      <p className="text-sm">Author: {book.writer}</p>
      <p className="text-sm">Price: {book.point} points</p>
      <p className="flex">
        Tags: &nbsp;
        {book.tags.map((tag, index) => {
          return <div key={index}>{tag.name} &nbsp;</div>;
        })}
      </p>
    </div>
  );
};

export default BookCard;
