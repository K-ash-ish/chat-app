import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import { useUserContext } from "./Context/User";

function AppLayout() {
  return (
    <div className="App flex flex-col justify-between h-[100vh]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  const user = useUserContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<ChatRoom />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
