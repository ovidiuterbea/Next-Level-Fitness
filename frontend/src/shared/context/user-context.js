import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  userId: null,
  subscription: null,
  name: null,
  surname: null,
  openWelcomeDialog: () => {},
  updateSubscription: () => {},
  login: () => {},
  logout: () => {},
});
