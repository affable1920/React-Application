import React from "react";
import { NavLink } from "react-router-dom";

const AlertTask = ({ task }) => {
  return (
    <div id="unfinished-task" key={task.id}>
      <div className="task-header">
        <NavLink state={task} to={`/task/${task.id}`}>
          {task.title}
        </NavLink>
      </div>
      <div className="task-body">
        <p>
          You added this task on:{" "}
          <span id="time">{task.history.creation["timeStamp"]}</span>
        </p>
      </div>
    </div>
  );
};

export default AlertTask;
