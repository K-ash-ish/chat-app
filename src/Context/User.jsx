import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = (props) => {
  const [username, setUsername] = useState(null);
  const setUserInput = (user) => {
    setUsername(user);
  };

  return (
    <UserContext.Provider value={{ username, setUserInput }}>
      {props.children}
    </UserContext.Provider>
  );
};
