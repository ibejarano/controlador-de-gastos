import React, { useReducer } from "react";
import UserReducer from "../reducers/user";

// let initUser;
// const localSavedUser = sessionStorage.getItem("expenses-user");
// if (localSavedUser) {
//   initUser = JSON.parse(localSavedUser);
// } else {
const initUser = { loggedIn: false };
// }


const UserContext = React.createContext(initUser);

export default UserContext;
