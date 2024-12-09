import React from "react";
import { NavLink } from "react-router-dom";

const AdminModal = () => {
  const handleAdminLinksToggle = () => {
    setshowAdminLinks((prev) => !prev);
  };

  const menuBarStyles = {
    absolute: {
      position: "absolute",
      top: "7%",
      right: "5%",
    },
    notAbsolute: {},
  };

  return (
    <div className="admin-modal">
      <ul>
        <li>Dashboard</li>
        <li>
          <NavLink to="/teams">Teams</NavLink>
        </li>
        <li>Membership</li>
        <li>Timeline</li>
      </ul>
    </div>
  );
};

export default AdminModal;
