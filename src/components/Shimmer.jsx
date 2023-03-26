import { v4 as uuidv4 } from "uuid";
function RoomListShimmer() {
  return (
    <aside className="pt-3 bg-slate-200">
      <div className=" w-28 md:w-72 md:ml-6  border-r-2  p-2 ">
        <div className="flex flex-col justify-center items-center md:items-stretch">
          <input
            type="text"
            className="my-1 text-base border-2 w-full md:p-2 p-1"
            placeholder="Room name"
          />
          <button className="my-2 border-2 border-emerald-500 md:text-base text-sm px-1">
            Create
          </button>
          <h1 className="my-1 text-center font-medium">Room List</h1>
        </div>
        <ul className="chat-rooms overflow-y-scroll  h-[400px]">
          {Array(10)
            .fill("")
            .map((e) => {
              return (
                <li
                  key={uuidv4()}
                  className="bg-emerald-300 md:rounded-md rounded-sm cursor-pointer capitalize my-3 text-center break-words md:text-base text-sm text-emerald-300"
                >
                  ...
                </li>
              );
            })}
        </ul>
      </div>
    </aside>
  );
}
export { RoomListShimmer };
