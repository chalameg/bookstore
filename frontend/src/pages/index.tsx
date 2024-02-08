import { Inter } from "next/font/google";
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className={`flex min-h-screen p-24 container w-full ${inter.className}`}
      >
        Welcome to bookstore&nbsp;<Link href={"/books"} className="text-[blue] underline">Books listing</Link>
      </main>
      <Footer/>
    </>
  );
}
