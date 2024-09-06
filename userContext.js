import React, { createContext, useState, useEffect } from "react";
import { decryptData } from "./Context/userFunction";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const x = localStorage.getItem("user");

      if (x) {
        const storedUser = decryptData(x);

        setUser(storedUser);
        if (user !== "") {
          const y = localStorage.getItem("token");

          const storedToken = decryptData(y);
          setToken(storedToken);
        }
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, searchInput, setSearchInput }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
