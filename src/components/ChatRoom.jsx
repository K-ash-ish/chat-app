import { useEffect, useRef, useState } from "react";
import supabase from "../config/supabase";
import RoomList from "./RoomList";
import { v4 as uuidv4 } from "uuid";
import { useUserContext } from "../Context/User";
import { useRoomContext } from "../Context/CurrentRoom";

function ChatRoom() {
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);
  const [fetchMessages, setFetchMessages] = useState(null);
  const currentUser = useUserContext();
  const currentRoom = useRoomContext();
  // const currentUser = {
  //   username: "kashish",
  // };
  useEffect(() => {
    const fetchChatData = async () => {
      const { data, error } = await supabase
        .from("chat_data")
        .select()
        .eq("chatroom", currentRoom.room);
      if (data) {
        setFetchMessages(data);
      }
    };
    fetchChatData();
  }, [currentRoom.room]);

  useEffect(() => {
    supabase
      .channel("any")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "*",
          table: "chat_data",
          filter: `chatroom=eq.${currentRoom.room}`,
        },
        (payload) => {
          setFetchMessages((prevState) => [...prevState, payload.new]);
        }
      )
      .subscribe();
    messageEndRef.current?.scrollIntoView();
  }, [fetchMessages]);
  const sendMessage = (e) => {
    e.preventDefault();
    const sendData = async () => {
      const { data, error } = await supabase.from("chat_data").insert([
        {
          username: currentUser.username,
          messages: input,
          chatroom: currentRoom.room,
        },
      ]);
    };
    sendData();
    setInput("");
  };
  return (
    <section className="flex flex-row justify-between  w-full h-[85vh] border-2">
      <RoomList />
      <div className=" pl-4 flex flex-col justify-between w-full h-full md:w-9/12">
        <h1 className="text-center my-2 text-lg font-semibold capitalize">
          {currentRoom?.room || "Select Room"}
        </h1>
        <div className="chats h-5/6 overflow-x-hidden overflow-y-scroll">
          {fetchMessages?.map((user) => {
            if (user.username === currentUser.username) {
              return (
                <div
                  key={uuidv4()}
                  className="min-h-[80px] flex flex-col items-end mr-2 justify-around "
                >
                  <p className="text-xs  font-semibold mt-1 mr-2">Me</p>
                  <p className="text-right bg-blue-300 my-2 text-lg mx-1 p-3  rounded-md  md:w-80 break-words">
                    {user.messages}
                  </p>
                </div>
              );
            } else {
              return (
                <div
                  key={uuidv4()}
                  className="min-h-[80px] flex flex-col items-start justify-around"
                >
                  <p className="text-xs  font-semibold mt-1 ml-1">
                    {user.username}
                  </p>
                  <p className="text-left bg-green-300 my-2 text-lg mx-1 p-3 rounded-md md:w-80 break-words">
                    {user.messages}
                  </p>
                </div>
              );
            }
          })}
          <div ref={messageEndRef} />
        </div>
        {currentUser.username && currentRoom.room != null ? (
          <form
            onSubmit={sendMessage}
            className="my-2 flex justify-around items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className=" p-4 border-2 md:h-14 h-12 w-5/6 "
              required
            />

            <button
              type="submit"
              className="ml-2 rounded-md md:p-4 p-2 bg-green-300"
            >
              Send
            </button>
          </form>
        ) : (
          <h1 className="text-center">
            Please create a user first or Select a room
          </h1>
        )}
      </div>
    </section>
  );
}

export default ChatRoom;
