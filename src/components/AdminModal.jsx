import React from "react";
import { NavLink } from "react-router-dom";

const AdminModal = () => {
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
