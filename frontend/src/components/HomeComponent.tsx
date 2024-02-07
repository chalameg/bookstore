import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Book } from '@/types/Book';

const HomeComponent = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/books?page=${page}`);
      setBooks([...books, ...response.data.data]);
      setPage(prevPage => prevPage + 1);
      setHasMore(page < response.data.lastPage);
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchBooks}
      hasMore={hasMore}
      loader={<div className="text-center">Loading...</div>}
      endMessage={
        <div className="text-center font-bold">
          You have seen all the books
        </div>
      }
      scrollThreshold="80%"
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {books.map((book) => (
          <div key={book.id} className="shadow-lg rounded-lg p-4 flex flex-col items-center">
            <img src={book.cover_image_url} alt={book.title} className="w-full h-64 object-cover rounded-md" />
            <h2 className="mt-2 text-lg font-bold">{book.title}</h2>
            <p className="text-sm">Author: {book.writer}</p>
            <p className="text-sm">Price: {book.point} points</p>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default HomeComponent;
