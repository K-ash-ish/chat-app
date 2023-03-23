import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function RoomList() {
  const [chatRooms, setChatRooms] = useState([]);
  const [roomName, setRoomName] = useState("");

  return (
    <aside className="pt-3">
      <div className="my-2 w-44 md:w-72 md:ml-6 border-r-2 pr-2 ">
        <div className="flex flex-col justify-center items-center md:items-stretch">
          <input
            type="text"
            className="my-1 border-2 w-full md:p-2 p-1"
            placeholder="Room name"
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            className="my-2 border-2 border-emerald-500"
            onClick={() =>
              setChatRooms((prevState) => [...prevState, roomName])
            }
          >
            Create New Room
          </button>
          <h1 className="my-1 text-center font-medium">Room List</h1>
        </div>
        <ul className="chat-rooms overflow-y-scroll  h-[400px]">
          {chatRooms.map((room) => {
            return (
              <li
                key={uuidv4()}
                className="border-b-2 my-3 text-center break-words"
              >
                {room}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default RoomList;
