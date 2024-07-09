import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`);
          setIsUserLoggedIn(true);
          setUsername(response.data.data.name);
          setId(response.data.data._id);
        } else {
          setIsUserLoggedIn(false);
          setUsername(null);
          setId(null);
        }
      } catch (error) {
        console.log('Error fetching user profile:', error.response ? error.response.data.message : error.message);
      }
    };

    getUser();
  }, []); // Ensure this dependency array is empty

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}