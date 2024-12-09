import React from "react";
import AlertTask from "./AlertTask";

const AlertTasks = ({ tasks }) => {
  return (
    <div id="unfinished-tasks">
      {tasks.map((task) => (
        <AlertTask key={task.id} task={task} />
      ))}
    </div>
  );
};

export default AlertTasks;
