import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RoomProvider } from "./Context/CurrentRoom";
import { UserProvider } from "./Context/User";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RoomProvider>
      <App />
    </RoomProvider>
  </UserProvider>
);
