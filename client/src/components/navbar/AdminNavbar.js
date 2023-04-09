import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Logo from "../../img/logo-eurocoders.svg";
import './Navbar.scss'

const AdminNavbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/admin-home">
          <img className="logo" src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/admin-photos">
            <h6>PHOTOS</h6>
          </Link>
          <Link className="link" to="/admin-users">
            <h6>USERS</h6>
          </Link>
          <Link className="link" to="/">
            <h6>LOGOUT</h6>
          </Link>
          {
            currentUser && 
          <span>Hello, admin!</span>
          }
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
