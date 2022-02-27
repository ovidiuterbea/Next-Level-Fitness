import { createContext } from "react";

export const TrainerContext = createContext({
  isLoggedIn: false,
  trainerId: null,
  login: () => {},
  logout: () => {},
});
