import React, { useContext } from "react";
import TaskContext from "../context/taskContext";

const ResetTimersBtn = () => {
  const { tasks, onTimerReset } = useContext(TaskContext);

  const tasksWithTimerOn = tasks.filter(
    ({ timerState }) => timerState.isActive === true
  );
  return (
    <button
      disabled={tasksWithTimerOn.length === 0}
      onClick={() => onTimerReset({ name: "Timer Reset for all tasks" })}
      className="btn btn-danger"
    >
      Clear all Timers
    </button>
  );
};

export default ResetTimersBtn;
