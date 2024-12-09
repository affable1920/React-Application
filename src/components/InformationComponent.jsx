import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import TaskContext from "../context/taskContext";

const InformationComponent = ({ tasks, alertTasks }) => {
  const { user } = useContext(TaskContext);
  return (
    <footer id="footer">
      <section id="info-component">
        <span style={{ letterSpacing: "1px" }} className="badge">
          {tasks.length === 0
            ? `No Active Tasks`
            : `${tasks.length} Active Tasks`}
        </span>
        {/* {tasksWithTimer.length !== 0 && (
          <span className="badge">{`${tasksWithTimer.length} Tasks have Active Timers`}</span>
        )} */}
        {/* {highPriorityTasks.length !== 0 && (
          <div className="high-priority-tasks-info">
            <NavLink>
              {highPriorityTasks.length} tasks have High Priority.
            </NavLink>
          </div>
        )} */}
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
