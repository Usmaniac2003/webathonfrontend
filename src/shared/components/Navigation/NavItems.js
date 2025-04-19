import React from "react";
import "./NavItems.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Slices/authenticationSlice";

const NavItems = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  return (
    <ul className="nav-items">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/courses">Courses</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/help">FAQ</NavLink>
      </li>

      {!auth.loggedIn && (
        <>
        
          <li className="dropdown">
            <span className="dropbtn">Sign Up ▾</span>
            <ul className="dropdown-content">
              <li>
                <NavLink to="/signup">Student Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/tsignup">Teacher Sign Up</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/signin">Sign In</NavLink>
          </li>
        </>
      )}

      {auth.loggedIn && auth.userInfo.role !== 2 && (
        
        <>
        
     
        <li>
        <NavLink to="/gc">Group Chat</NavLink>
      </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>

          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      )}

      {auth.loggedIn && auth.userInfo.role === 2 && (
        <>
        
        <li>
        <NavLink to="/ai">AI</NavLink>
      </li>
        <li>
        <NavLink to="/gc">Chat</NavLink>
      </li>
          <li>
            <NavLink to="/send-mail">Send Mail</NavLink>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavItems;
