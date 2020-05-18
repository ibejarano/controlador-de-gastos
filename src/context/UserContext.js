import React from "react";

const initUser = { loggedIn: false };

const UserContext = React.createContext(initUser);

export default UserContext;
