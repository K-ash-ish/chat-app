import { createContext, useContext, useState } from "react";

const RoomContext = createContext(null);
export const useRoomContext = () => useContext(RoomContext);

export const RoomProvider = (props) => {
  const [room, setRoom] = useState(null);
  const selectRoom = (currentRoom) => {
    setRoom(currentRoom);
  };
  return (
    <RoomContext.Provider value={{ room, selectRoom }}>
      {props.children}
    </RoomContext.Provider>
  );
};
