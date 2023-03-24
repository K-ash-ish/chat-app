import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import supabase from "../config/supabase";
import { useRoomContext } from "../Context/CurrentRoom";

function RoomList() {
  const [chatRooms, setChatRooms] = useState();
  const [roomName, setRoomName] = useState("");
  const currentRoom = useRoomContext();
  useEffect(() => {
    const fetchChatRooms = async () => {
      const { data, error } = await supabase.from("chatroom-data").select();
      if (data) {
        setChatRooms(data);
      }
    };
    fetchChatRooms();
    supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "*", table: "chatroom-data" },
        (payload) =>
          setChatRooms((prevState) => {
            return [...prevState, payload.new];
          })
      )
      .subscribe();
  }, []);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const { data, error } = await supabase.from("chatroom-data").select();
      if (data) {
        setChatRooms(data);
      }
    };
    fetchChatRooms();
  }, []);
  useEffect(() => {
    supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "*", table: "chatroom-data" },
        (payload) =>
          setChatRooms((prevState) => {
            return [...prevState, payload.new];
          })
      )
      .subscribe();
  }, [chatRooms]);

  const addNewRoom = () => {
    const sendData = async () => {
      const { data, error } = await supabase.from("chatroom-data").insert([
        {
          chatroom_name: roomName,
        },
      ]);
      if (error) {
        console.log(error);
      }
    };
    sendData();
    setRoomName("");
  };
  return (
    <aside className="pt-3">
      <div className="my-2 w-28 md:w-72 md:ml-6 border-r-2 pr-2 ">
        <div className="flex flex-col justify-center items-center md:items-stretch">
          <input
            type="text"
            className="my-1 border-2 w-full md:p-2 p-1"
            placeholder="Room name"
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            className="my-2 border-2 border-emerald-500 md:text-base text-sm px-1"
            onClick={addNewRoom}
          >
            Create
          </button>
          <h1 className="my-1 text-center font-medium">Room List</h1>
        </div>
        <ul className="chat-rooms overflow-y-scroll  h-[400px]">
          {chatRooms?.map((room) => {
            return (
              <li
                onClick={(e) => {
                  currentRoom.selectRoom(e.target.textContent);
                }}
                key={uuidv4()}
                className="bg-emerald-300 md:rounded-md rounded-sm cursor-pointer capitalize my-3 text-center break-words md:text-base text-sm"
              >
                {room.chatroom_name}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default RoomList;
