import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const URI = `http://localhost:3000`;
  const navigate = useNavigate();

  const loginAction = async (login) => {
    try {
      const response = await axios.post(URI, login);
      console.log(response.data, response.status);
      if (response.status === 200) {
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem("site", response.data.token);
        navigate("/store");
        return;
      }
      throw new Error(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
