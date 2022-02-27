import { createContext } from "react";

export const AdminContext = createContext({
  isLoggedIn: false,
  adminId: null,
  login: () => {},
  logout: () => {},
});
