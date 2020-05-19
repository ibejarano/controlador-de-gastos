import React, { createContext, useReducer, useContext } from "react";
import reducer from "../reducers/user";

const initUser = {
  username: "custom hook user!",
  wallets: [
    {
      _id: 1,
      name: "hook local wallet",
      balance: 1500,
      description: "nadaa",
      expenses: [],
    },
  ],
  budgets: [],
  sectionsSaved: ["comida", "general"],
  wallet: {
    name: "hook local wallet",
    balance: 1500,
    description: "nadaa",
    expenses: [],
  },
  openWallet: false,
};

const UserContext = createContext(initUser);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, initUser);
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
// const customHook = { UserProvider, useUser };
// export default customHook;
