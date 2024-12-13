import React, { useContext } from "react";
import TaskContext from "../context/taskContext";

const ResetButton = ({ onReset }) => {
  const { tasks } = useContext(TaskContext);
  return (
    <button
      onClick={onReset}
      disabled={tasks?.length === 0}
      className="btn btn-primary"
    >
      ~
    </button>
  );
};

export default ResetButton;
