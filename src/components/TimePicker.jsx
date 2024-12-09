import React, { useContext, useState } from "react";
import TaskContext from "../context/taskContext";
import CustomTimeComponent from "./CustomTimeComponent";
import { MdCancel } from "react-icons/md";

const TimePicker = ({ task, taskIsActive }) => {
  const { handleTimer, handleTimerCancel } = useContext(TaskContext);
  const [customClicked, setCustomClicked] = useState(false);

  const times = ["1 min", "15 min", "30 min", "1 hr"];

  const handleCustomClick = () => {
    setCustomClicked(!customClicked);
  };

  return taskIsActive ? (
    <MdCancel
      style={{ cursor: "pointer" }}
      onClick={() => handleTimerCancel(task, { name: "Timer Cancelled" })}
    />
  ) : (
    <div className="time-span-container">
      <div>
        {times.map((time) => (
          <button
            onClick={() => handleTimer(task, time, { name: "Timer Set" })}
            className="time-span"
            key={time}
          >
            {time}
          </button>
        ))}
      </div>
      <button onClick={handleCustomClick} className="time-span custom">
        Custom
      </button>
      {customClicked && <CustomTimeComponent task={task} />}
    </div>
  );
};

export default TimePicker;
