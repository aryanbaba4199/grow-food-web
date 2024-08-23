// contexts/UserContext.js
import React, { createContext, useState, useEffect, useRef } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
    if (typeof window !== 'undefined' && ref.current) {
      const userid = localStorage?.getItem('user') ? localStorage.getItem('user') : '';
      if (userid !== '') {
        const user = JSON.parse(userid);
        setUser(user);
      }
    }
    return () => {
      ref.current = false;
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
