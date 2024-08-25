// contexts/UserContext.js
import React, { createContext, useState, useEffect, useRef } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const ref = useRef(false);


  useEffect(() => {
    ref.current = true;
    if (typeof window !== 'undefined' && ref.current) {
      const userid = localStorage?.getItem('user') ? localStorage.getItem('user') : '';
      if (userid !== '') {
        const user = JSON.parse(userid);
        setUser(user);
        setToken(localStorage.getItem('token'));
      }
    }
    return () => {
      ref.current = false;
    };
  }, []);

  useEffect(()=>{
    if(token!==''){
      const x = localStorage.getItem('user');
      console.log('calling x', x);
      setUser(x);
    }
    
  }, [token])

  



  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
