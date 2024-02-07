import Footer from '@/components/Layouts/Footer'
import Navbar from '@/components/Layouts/Navbar'
import BookDetails from '@/components/UI/BookDetails';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React from 'react'

const inter = Inter({ subsets: ["latin"] });

const BookDetailsPage = () => {
    const {query} = useRouter();
    const id = query.id ? parseInt(query.id as string, 10) : undefined;

  return (
    <>
    <Navbar />
    <main
      className={`flex min-h-screen p-24 container w-full ${inter.className}`}
    >
       {id !== undefined && <BookDetails id={id} />}
    </main>
    <Footer/>
  </>
  )
}

export default BookDetailsPage