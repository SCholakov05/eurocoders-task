import axios from "axios";
import { createContext, useEffect, useState } from "react";


// Create a new context for the authentication information
export const AuthContext = createContext();

// Create a new component that will provide the authentication information to its children
export const AuthContexProvider = ({ children }) => {
  // Use the useState hook to create a currentUser state variable and set its initial value to the user information in local storage (if available) or null
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Define a login function that will send a POST request to the server to authenticate the user and update the currentUser state variable with the user information
  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  // Define a logout function that will send a POST request to the server to log out the user and update the currentUser state variable to null
  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  // Use the useEffect hook to update the user information in local storage whenever the currentUser state variable changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Return the AuthContext.Provider component with the value set to an object containing the currentUser state variable, the login function, and the logout function
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};