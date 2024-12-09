import React, { useContext } from "react";
import TaskContext from "../context/taskContext";

const Filter = () => {
  const { onStatusChange, status, tasks } = useContext(TaskContext);

  return (
    <button
      onClick={onStatusChange}
      disabled={tasks.length === 0}
      className="btn btn-warning"
      id="button"
    >
      Filter Tasks by : {status}
    </button>
  );
};

export default Filter;
