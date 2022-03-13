import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  userId: null,
  subscription: null,
  updateSubscription: () => {},
  login: () => {},
  logout: () => {},
});
