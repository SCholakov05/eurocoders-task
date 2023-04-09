import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Logo from "../../img/logo-eurocoders.svg";
import './Navbar.scss'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img className="logo" src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/photos">
            <h6>PHOTOS</h6>
          </Link>
          <Link className="link" to="/users">
            <h6>USERS</h6>
          </Link>
          <Link className="link" to="/contacts">
            <h6>CONTACTS</h6>
          </Link>
          {currentUser ? (
            <span onClick={logout} className="logout">LOGOUT</span>
            ) : (
              <Link className="link" to="/login">
              Login
            </Link>
          )}
          {
            currentUser && 
          <span>{`Hello, ${currentUser?.username}!`}</span>
          }
          <span className="publish">
            <Link className="publish-link" to="/publish">
              PUBLISH
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
