import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home/Home";
import Register from "./pages/login-register/Register";
import Login from "./pages/login-register/Login";
import Navbar from "./components/navbar/Navbar";
import './Style.scss';
import Photos from "./pages/photos/Photos";
import Single from "./pages/single/Single";
import PublishPhoto from "./pages/PublishPhoto";
import Users from "./pages/users/Users";
import Contacts from "./pages/contacts/Contacts";
import AdminLogin from "./pages/login-register/AdminLogin";
import AdminHome from "./pages/home/AdminHome";
import AdminPhotos from "./pages/photos/AdminPhotos";
import AdminUsers from "./pages/users/AdminUsers";

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
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin-home",
    element: <AdminHome />,
  },
  {
    path: "/admin-photos",
    element: <AdminPhotos />,
  },
  {
    path: "/admin-users",
    element: <AdminUsers />,
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
