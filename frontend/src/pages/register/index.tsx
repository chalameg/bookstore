import { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";
import { MyContext } from "@/store/context";
import Link from "next/link";
import httpService from "@/httpService";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { setIsLoggedIn } = useContext(MyContext);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setErrorMessage(null); // Reset error message on input change
  };

  const register = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission

    try {
      // Adjust the endpoint URL to your registration endpoint
      const response = await httpService.post(`/customers`, { username });
      
      if (response.status === 201 && response.data) {
        localStorage.setItem('username', username); // Store username in localStorage
        setIsLoggedIn(true);
        router.push('/books'); // Navigate to /books page
      } else {
        setErrorMessage("Can't register. Username may already be taken.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Can't register. An error occurred. Try with d/t username");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center min-h-screen">
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
            <div className="flex items-center justify-between">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={register}
              >
                Register
              </button>
            </div>
          </form>
          {errorMessage && <p className="text-center text-red-500 text-xs">{errorMessage}</p>}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login">
              <button className="text-blue-500 hover:text-blue-700">Login</button>
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
