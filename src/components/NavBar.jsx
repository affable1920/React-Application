import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <header id="page-header">
      <nav id="nav-bar">
        <ul className="nav-list">
          <li>
            <NavLink to="/add">Add your todo </NavLink>
          </li>
          <li>
            <NavLink to="/">Tasks</NavLink>
          </li>
        </ul>
        <ul className="user-routes">
          {currentUser && (
            <>
              <li
                style={{ textTransform: "capitalize", letterSpacing: ".6px" }}
              >
                {!currentUser.displayName ? (
                  <p>Logging you In ...</p>
                ) : (
                  <NavLink to="profile">{currentUser.displayName}</NavLink>
                )}
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </>
          )}
          {!currentUser && (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
