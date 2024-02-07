import Books from '@/components/Books'
import Footer from '@/components/Layouts/Footer'
import Navbar from '@/components/Layouts/Navbar'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ["latin"] });

const index = () => {
  return (
    <>
      <Navbar />
      <main
        className={`flex min-h-screen p-24 container w-full ${inter.className}`}
      >
        <Books/>
      </main>
      <Footer/>
    </>
  )
}

export default index