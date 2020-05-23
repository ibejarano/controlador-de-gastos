import React, { createContext, useReducer, useContext } from "react";
import reducer from "../reducers/user";

const sessionUser = JSON.parse(sessionStorage.getItem("expenses-user"));

// const initUser = {
//   username: "custom hook user!",
//   wallets: [
//     {
//       _id: 1,
//       name: "Wallet A Hook",
//       balance: 1500,
//       description: "Description A",
//       expenses: [
//         {
//           _id: 1,
//           description: "papel",
//           amount: 130,
//           section: "comida",
//           createdAt: Date.now(),
//         },
//       ],
//     },
//     {
//       _id: 2,
//       name: "wallet B Hook",
//       balance: 2300,
//       description: "Description wallet b",
//       expenses: [],
//     },
//   ],
//   budgets: [],
//   sectionsSaved: ["comida", "general"],
//   openWallet: false,
// };

const UserContext = createContext({});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, {
    loggedIn: false,
    ...sessionUser,
  });
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
