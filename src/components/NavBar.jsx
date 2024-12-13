import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

const NavBar = () => {
  const { user } = useContext(UserContext);
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
          <li>
            <NavLink to="/tasks/high">High Priority Tasks</NavLink>
          </li>
          <li>
            <NavLink to="/newTasks">Refactor</NavLink>
          </li>
        </ul>
        <ul className="user-routes">
          {/* {
            <div id="theme-toggler-btn">
              <button className="btn btn-dark">Toggle Theme</button>
            </div>
          } */}
          {user && (
            <>
              <li
                style={{ textTransform: "capitalize", letterSpacing: ".6px" }}
              >
                {!user.displayName ? (
                  <p>Logging you In ...</p>
                ) : (
                  <NavLink to="profile">{user.displayName}</NavLink>
                )}
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </>
          )}
          {!user && (
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
