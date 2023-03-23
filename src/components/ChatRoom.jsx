import { useState } from "react";
import RoomList from "./RoomList";
function ChatRoom() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState();
  const sendMessage = () => {
    setMessage(input);
    setInput("");
  };
  return (
    <section className="flex flex-row justify-between  w-full h-[85vh] border-2">
      <RoomList />
      <div className=" pl-4 flex flex-col justify-between w-full h-full md:w-9/12">
        <h1 className="text-center my-2 text-lg font-semibold">RoomName</h1>
        <div className=" h-5/6 overflow-y-scroll">
          <p className="text-right bg-blue-300 my-2 text-lg mx-1 p-3  rounded-md ">
            Hello
          </p>
          <p className="text-left bg-green-300 my-2 text-lg mx-1 p-3 rounded-md">
            Hello
          </p>
        </div>
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
      </div>
    </section>
  );
}

export default ChatRoom;
