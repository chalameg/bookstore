import { Inter } from "next/font/google";
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function index() {
  return (
    <>
      <Navbar />
      <main
        className={`flex min-h-screen p-24 container w-full ${inter.className}`}
      >
        My Orders
      </main>
      <Footer/>
    </>
  );
}
