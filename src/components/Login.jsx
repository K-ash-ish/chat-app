import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabase";
import { useUserContext } from "../Context/User";

function Login() {
  const [value, setValue] = useState("");
  const [fetchUser, setFetchUser] = useState();
  const [userPresent, setUserPresent] = useState(false);
  const navigate = useNavigate();
  const user = useUserContext();
  useEffect(() => {
    const fetchChatData = async () => {
      const { data, error } = await supabase
        .from("chat_data")
        .select("username");
      if (data) {
        setFetchUser(data);
      }
    };
    fetchChatData();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const present = fetchUser?.filter((data) => {
          return data.username === value;
        });
        if (present.length > 0) {
          setUserPresent(true);
        } else {
          user.setUserInput(value);
          navigate("/");
        }
      }}
      className=" border-2 border-green-300 w-[400px] mx-auto my-0 h-[400px] flex flex-col justify-center items-center"
    >
      {userPresent ? <h1 className="text-red-400">UserExist</h1> : null}
      <input
        type="text"
        className="border-2 h-10 w-56 p-2"
        placeholder="Username"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        required
      />
      <button type="submit" className="border-2 my-4 px-2 py-1">
        Enter
      </button>
    </form>
  );
}

export default Login;
