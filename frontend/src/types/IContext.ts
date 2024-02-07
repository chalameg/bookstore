// context/types.ts

export interface IContext {
  isLoggedIn: boolean;
  setIsLoggedIn: (newState: boolean) => void; 
}
