import React, { createContext, useState } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [displayUser, setDisplayUser] = useState(null);

  return (
    <UserContext.Provider value={{ displayUser, setDisplayUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
