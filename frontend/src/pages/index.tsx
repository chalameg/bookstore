import { Inter } from "next/font/google";
import Navbar from "@/components/Layouts/Navbar";
import HomeComponent from "@/components/HomeComponent";
import Footer from "@/components/Layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className={`flex min-h-screen p-24 ${inter.className}`}
      >
        <HomeComponent/>
      </main>
      <Footer/>
    </>
  );
}
