import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/User";

function Login() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const user = useUserContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        user.setUserInput(value);
        navigate("/");
      }}
      className="absolute top-1/4 left-[20%] md:left-[35%] border-2 border-green-300 w-[400px] mx-auto my-0 h-[400px] flex flex-col justify-center items-center"
    >
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
