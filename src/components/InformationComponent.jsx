import React from "react";
import { NavLink } from "react-router-dom";

const InformationComponent = ({ tasks, alertTasks }) => {
  return (
    <footer id="footer">
      <section id="info-component">
        <span style={{ letterSpacing: "1px" }} className="badge">
          {tasks.length === 0
            ? `No Active Tasks`
            : `${tasks.length} Active Tasks`}
        </span>
        {alertTasks.length !== 0 && (
          <div className="unfinished-tasks-info">
            <NavLink to="/tasks/unfinished">
              {alertTasks.length} - Tasks need checking-up!
            </NavLink>
          </div>
        )}
      </section>
    </footer>
  );
};

export default InformationComponent;
