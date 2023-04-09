import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/login-register/Register";
import Login from "./pages/login-register/Login";
import Navbar from "./components/navbar/Navbar";
import './Style.scss';
import Photos from "./pages/photos/Photos";
import Single from "./pages/single/Single";
import PublishPhoto from "./pages/PublishPhoto";
import Users from "./pages/Users";
import Contacts from "./pages/contacts/Contacts";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/photos",
        element: <Photos />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/photo/:id",
        element: <Single />,
      },
      {
        path: "/publish",
        element: <PublishPhoto />,
      },
    ]

  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  

]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
