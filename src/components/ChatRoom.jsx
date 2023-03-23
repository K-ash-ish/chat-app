import { useEffect, useState } from "react";
import supabase from "../config/supabase";
import RoomList from "./RoomList";
import { v4 as uuidv4 } from "uuid";
import { useUserContext } from "../Context/User";
import { useRoomContext } from "../Context/CurrentRoom";
function ChatRoom() {
  const [input, setInput] = useState("");
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
    supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "*", table: "chat_data" },
        (payload) => {
          setFetchMessages((prevState) => [...prevState, payload.new]);
        }
      )
      .subscribe();
  }, [currentRoom.room]);
  const sendMessage = () => {
    const sendData = async () => {
      const { data, error } = await supabase.from("chat_data").insert([
        {
          username: currentUser.username,
          messages: input,
          chatroom: currentRoom.room,
        },
      ]);

      console.log(error);
    };
    sendData();
    setInput("");
  };
  return (
    <section className="flex flex-row justify-between  w-full h-[85vh] border-2">
      <RoomList />
      <div className=" pl-4 flex flex-col justify-between w-full h-full md:w-9/12">
        <h1 className="text-center my-2 text-lg font-semibold">
          {currentRoom?.room || "Select Room"}
        </h1>
        <div className=" h-5/6 overflow-y-scroll">
          {fetchMessages?.map((user) => {
            if (user.username === currentUser.username) {
              return (
                <div
                  key={uuidv4()}
                  className="min-h-[80px] flex flex-col items-end mr-2 justify-around"
                >
                  <p className="text-xs  font-semibold mt-1 mr-2">Me</p>
                  <p className="text-right bg-blue-300 my-2 text-lg mx-1 p-3  rounded-md ">
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
                  <p className="text-left bg-green-300 my-2 text-lg mx-1 p-3 rounded-md">
                    {user.messages}
                  </p>
                </div>
              );
            }
          })}
        </div>
        {currentUser.username ? (
          <div className="my-2 flex justify-around items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className=" p-4 border-2 md:h-14 h-12 w-5/6 "
            />

            <button
              onClick={sendMessage}
              className="ml-2 rounded-md md:p-4 p-2 bg-green-300"
            >
              Send
            </button>
          </div>
        ) : (
          <h1 className="text-center">Please create a user first</h1>
        )}
      </div>
    </section>
  );
}

export default ChatRoom;
