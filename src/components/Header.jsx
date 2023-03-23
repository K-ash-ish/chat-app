import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <nav className=" flex justify-around items-center my-2 border-b-2 h-16">
      <h1 className="font-bold text-3xl">
        Chat<span className="text-green-500">Hub</span>
      </h1>
      <h1 className="  text-gray-500">
        <FontAwesomeIcon icon={faUser} /> UserName
      </h1>
    </nav>
  );
}
export default Header;
