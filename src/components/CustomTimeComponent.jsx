import React, { useContext, useRef } from "react";
import TaskContext from "../context/taskContext";

const CustomTimeComponent = ({ task }) => {
  const ref = useRef(null);
  const { handleCustomTimer } = useContext(TaskContext);

  return (
    <form>
      <div className="custom-input">
        <input type="datetime-local" ref={ref} />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleCustomTimer(task, ref.current.value, { name: "Timer Set" });
          }}
        >
          Set
        </button>
      </div>
    </form>
  );
};

export default CustomTimeComponent;
