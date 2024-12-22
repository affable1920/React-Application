import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TimePicker from "./TimePicker";
import Timer from "./Timer";
import Levels from "./Levels";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { IoMdMore } from "react-icons/io";
import {
  MdArchive,
  MdArrowDropDownCircle,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDelete,
} from "react-icons/md";
import UserContext from "../context/UserContext";

const TaskRow = ({ task }) => {
  const { id, title, completed, description, category, priority, timerState } =
    task;
  const { user } = useContext(UserContext);

  const [loadMore, setLoadMore] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  const renderPriorityIcon = () => {
    if (priority.toLowerCase() === "high") return <FcHighPriority />;
    if (priority.toLowerCase() === "medium") return <FcMediumPriority />;
    if (priority.toLowerCase() === "low") return <FcLowPriority />;
  };

  function handleTaglineToggle() {
    setShowTagline((p) => !p);
  }

  useEffect(() => {
    const endTime = new Date(timerState?.endsAt);
    setInterval(() => {
      const now = Date.now();
      const timeLeft = (endTime.getTime() - now) / 1000;
      timeLeft <= 86400 && setShowTimer(true);
    }, 1000);
  }, [timerState?.endsAt]);

  return (
    <>
      <div id="task-row" key={id}>
        <div className="task-desc">
          <div className="task-title">
            {user ? (
              <NavLink state={task} to={`/task/${id}`}>
                {title}
              </NavLink>
            ) : (
              <h3>{title}</h3>
            )}
            <MdArrowDropDownCircle
              onClick={handleTaglineToggle}
              className="task-dropdown"
            />
          </div>
          {showTagline && <span className="task-tagline">{description}</span>}
        </div>
        <div className="task-info">
          <div className="task-details">
            <span id="priority">{priority && renderPriorityIcon()}</span>
            <span>{category}</span>
          </div>
          <div className="task-timer">
            {!completed && timerState?.isActive ? (
              <IoNotificationsSharp onClick={() => onTimerClick(id)} />
            ) : (
              <IoNotificationsOutline onClick={() => onTimerClick(id)} />
            )}
          </div>
        </div>
        <div className="task-row-btns">
          <button disabled={!user} className="btn btn-secondary priority-btn">
            {priority ? "Change Priority" : "Set Priority"}
          </button>
          <div className="priority-cell">
            <Levels task={task} />
          </div>
          {<button className="btn btn-danger">Delete</button>}
          <IoMdMore
            onClick={() => setLoadMore(!loadMore)}
            className="load-more-icon"
          />
          {loadMore && (
            <div className="option-menu">
              <button>
                <MdDelete className="icon" />
              </button>
              <button>
                {completed ? (
                  <MdCheckBox className="icon" />
                ) : (
                  <MdCheckBoxOutlineBlank className="icon" />
                )}
              </button>
              <button>
                <MdArchive className="icon" />
              </button>
            </div>
          )}
          <div>
            <Timer timerState={timerState} />
          </div>
        </div>
      </div>
    </>
  );
};
export default TaskRow;
