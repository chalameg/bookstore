import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Book } from '@/types/Book';
import Link from 'next/link';
import BookCard from './UI/BookCard';

const Books : FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);


  useEffect(() => {
    fetchTags();
    fetchBooks();
  }, []);
  
  const fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tags'); 
      setTags(response.data);
    } catch (error) {
      console.error('Failed to fetch tags', error);
    }
  };  

  const fetchBooks = async (newPage?: number) => {
    const currentPage = newPage ?? page; // Use newPage if provided, otherwise use the current page state
    try {
      const tagsQuery = selectedTags.join(',');
      const response = await axios.get(`http://localhost:3000/api/books?page=${currentPage}&tags=${tagsQuery}`);
      if (currentPage === 1) {
        setBooks(response.data.data); // Reset books for the new filter
      } else {
        setBooks(prevBooks => [...prevBooks, ...response.data.data]);
      }
      setPage(prevPage => prevPage + 1);
      setHasMore(currentPage < response.data.lastPage);
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tagId = Number(event.target.value);
    if (event.target.checked) {
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    }
  }; 
  
  useEffect(() => {
    setBooks([]);
    fetchBooks(1); // Fetch the first page of books with the new tags
    setPage(2); // Since you're fetching the first page, the next page to fetch would be page 2
  }, [selectedTags]); // Re-fetch books when selectedTags changes
  

  return (
    <div className='flex flex-col sm:flex-row gap-2'>
      <div className='w-full sm:w-[10vw] p-4 flex flex-col gap-2 border-0 sm:border-r-2'>

        <span className='font-bold'>Filter By Tags:</span>

        {tags.map((tag, index) => (
          <div key={index} className='flex gap-2'>
            <input
              type="checkbox"
              id={`tag-${index}`}
              name="tags"
              value={tag.id}
              onChange={handleTagChange}
            />
            <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
          </div>
        ))}
      </div>

      <div className='w-[100vw] sm:w-[80vw]'>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 p-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book}/>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Books;
