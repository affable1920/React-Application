import React, { useRef } from "react";

const CustomTimeComponent = ({ task }) => {
  const ref = useRef(null);

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
