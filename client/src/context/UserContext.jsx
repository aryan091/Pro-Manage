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
        console.log('useEffect in UserContext is running'); // Debug log
        const token = localStorage.getItem("token");
        console.log('Token in UserContext:', token); // Debug log
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`);
          console.log('User data:', response.data.data.user); // Debug log
          setIsUserLoggedIn(true);
          setUsername(response.data.data.user.name);
          setId(response.data.data.user._id);
        } else {
          console.log('No token found');
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
