import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import Header from "./components/Header";
import Login from "./components/Login";
import { useUserContext } from "./Context/User";

function AppLayout() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

function App() {
  const user = useUserContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<Login />} />
        <Route
          path="chatroom"
          element={user.username ? <ChatRoom /> : <Login />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
