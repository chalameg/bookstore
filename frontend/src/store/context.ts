//MyContext.tsx

import { IContext } from "@/types/IContext";
import { createContext } from "react";

// Define a default context value adhering to IContext interface
const defaultContextValue: IContext = {
  isLoggedIn: false, 
  setIsLoggedIn: () => {},
};

export const MyContext = createContext<IContext>(defaultContextValue);
