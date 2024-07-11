import { createContext, useState, useEffect } from "react";
import axios from 'axios';

 const UserContext = createContext({});

 function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [boardUsers , setBoardUsers] = useState([])
  

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
          setBoardUsers(response.data.data.board)
        } else {
          setIsUserLoggedIn(false);
          setUsername(null);
          setId(null);
          setBoardUsers([])
        }
      } catch (error) {
        console.log('Error fetching user profile:', error.response ? error.response.data.message : error.message);
      }
    };

    getUser();
  }, []); // Ensure this dependency array is empty

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, isUserLoggedIn, setIsUserLoggedIn , boardUsers , setBoardUsers  }}>
      {children}
    </UserContext.Provider>
  );
}
export { UserContextProvider, UserContext };
