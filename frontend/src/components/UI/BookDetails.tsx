import { Book } from "@/types/Book";
import React, { FC, useContext, useEffect, useState } from "react";
import BookCard from "./BookCard";
import httpService from "@/httpService";
import { MyContext } from "@/store/context";
import { useRouter } from "next/router";

interface Props {
  id: number;
}

const BookDetails: FC<Props> = ({ id }) => {
  const [book, setBook] = useState<Book>();
  const {isLoggedIn} = useContext(MyContext);
  const router = useRouter();

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await httpService.get(`/books/${id}`);
      console.log(response.data);
      setBook(response.data);
    } catch (error) {
      console.error("Failed to fetch book", error);
    }
  };

  const order = async () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      router.push('/login');
      return;
    }
  
    // Retrieve the username from local storage
    const username = localStorage.getItem('username');
    if (!username) {
      console.error("Username not found");
      return;
    }
  
    try {
      // Find user by username to get their ID and current points
      const userResponse = await httpService.get(`/customers/findByUsername?username=${username}`);
      const { id: customerId, points } = userResponse.data;
  
      // Check if the book's price is within the customer's current points
      if (book && points >= book.point) {
        // Proceed with creating the order
        const orderResponse = await httpService.post('/orders', {
          customerId,
          bookId: id,
          orderStatus: 'placed'
        });
  
        if (orderResponse.status === 201) {
          // Adjust the customer's points
          const newPoints = points - book.point;
          await httpService.put(`/customers/${customerId}`, { points: newPoints });

          router.push('/orders');
        }
      } else {
        alert("You don't have enough points to buy this book.");
      }
    } catch (error) {
      console.error("Failed to place order", error);
      alert('Failed to place order. Please try again.');
    }
  };  

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
