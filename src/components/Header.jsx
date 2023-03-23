import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../Context/User";
import { NavLink } from "react-router-dom";

function Header() {
  const user = useUserContext();
  return (
    <nav className=" flex justify-around items-center my-2 border-b-2 h-16">
      <NavLink to="/">
        <h1 className="font-bold text-3xl">
          Chat<span className="text-green-500">Hub</span>
        </h1>
      </NavLink>
      <NavLink to="/login">
        <h1 className=" capitalize text-gray-500">
          <FontAwesomeIcon icon={faUser} /> {user.username || "Login"}
        </h1>
      </NavLink>
      {user.username ? <button onClick={user.logOut}>Logout</button> : null}
    </nav>
  );
}
export default Header;
