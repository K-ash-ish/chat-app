import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = (props) => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    if (localStorage.length > 0) {
      const localUser = localStorage.getItem("user");
      setUsername(localUser);
    }
  }, []);
  const setUserInput = (user) => {
    setUsername(user);
    localStorage.setItem("user", user);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUsername("");
  };

  return (
    <UserContext.Provider value={{ username, setUserInput, logOut }}>
      {props.children}
    </UserContext.Provider>
  );
};
