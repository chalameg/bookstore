import { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { Inter } from "next/font/google";
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";
import { MyContext } from "@/store/context";
import Link from "next/link";
import httpService from "@/httpService";

const inter = Inter({ subsets: ["latin"] });

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const {isLoggedIn, setIsLoggedIn} = useContext(MyContext);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setErrorMessage(null); // Reset error message on input change
  };

  const login = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission

    try {
      const response = await httpService.get(`/customers/findByUsername?username=${username}`);
      
      // Assuming your API returns the user object on success
      if (response.status === 200 && response.data) {
        localStorage.setItem('username', username); // Store username in localStorage
        router.push('/books'); // Navigate to /books page
        setIsLoggedIn(true);
      } else {
        setErrorMessage("Can't login. User does not exist.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Can't login. An error occurred.");
    }
  };

  return (
    <>
      <Navbar />
      <main className={`flex items-center justify-center min-h-screen ${inter.className}`}>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={login}
              >
                Login
              </button>
          </form>
          {errorMessage && <p className="text-center text-red-500 text-xs">{errorMessage}</p>}

          <p className="text-center text-sm">
            Don't have an account yet?{" "}
            <Link href="/register">
              <button className="text-blue-500 hover:text-blue-700">Register</button>
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
