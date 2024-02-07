import { Book } from '@/types/Book';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'

interface Props {
  id: number; 
}

const BookDetails : FC<Props> = ({id}) => {
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/books/${id}`);
      console.log(response.data)
      setBook(response.data);
    } catch (error) {
      console.error('Failed to fetch book', error);
    }
  };

  return (
    <div>
      <img src={book?.cover_image_url} alt={book?.title} className="w-full h-64 object-cover rounded-md" />
      {book?.title}
    </div>
  )
}

export default BookDetails;