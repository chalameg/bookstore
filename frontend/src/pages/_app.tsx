import { MyContext } from "@/store/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const values = {
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <MyContext.Provider value={values}>
      <Component {...pageProps} />
    </MyContext.Provider>
  );
}