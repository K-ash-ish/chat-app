import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function RoomList() {
  const [sidebar, setSidebar] = useState(true);
  const handleClick = () => {
    setSidebar((prevStae) => !prevStae);
  };
  return (
    <aside>
      <button
        className="mx-1 text-xl"
        onClick={() => {
          setSidebar(!sidebar);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div
        className={`h-screen border-2  w-44 transition-all ease-in duration-700 ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="my-1 text-center font-medium">Room List</h1>
        <div className="flex flex-col justify-center">
          <input type="text" className="my-1 border-2 w-full" />
          <button className="my-2 border-2 border-emerald-500">
            Create New Room
          </button>
        </div>
        <ul className="">
          <li className="border-b-2 my-3 text-center">Chat Room</li>
          <li className="border-b-2 my-3 text-center">Chat Room</li>
          <li className="border-b-2 my-3 text-center">Chat Room</li>
          <li className="border-b-2 my-3 text-center">Chat Room</li>
        </ul>
      </div>
    </aside>
  );
}

export default RoomList;
