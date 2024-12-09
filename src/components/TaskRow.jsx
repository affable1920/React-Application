import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TaskContext from "../context/taskContext";
import TimePicker from "./TimePicker";
import Timer from "./Timer";
import Levels from "./Levels";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import {
  MdArchive,
  MdArrowDropDownCircle,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDelete,
} from "react-icons/md";

const TaskRow = ({ task }) => {
  const { id, title, completed, description, category, priority, timerState } =
    task;

  const [loadMore, setLoadMore] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const {
    onCheckBoxChange,
    onDelete,
    onTimerClick,
    currentTask,
    handlePriority,
    user,
  } = useContext(TaskContext);

  const renderPriorityIcon = () => {
    if (priority.toLowerCase() === "high") return <FcHighPriority />;
    if (priority.toLowerCase() === "medium") return <FcMediumPriority />;
    if (priority.toLowerCase() === "low") return <FcLowPriority />;
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  function handleTaglineToggle() {
    setShowTagline((p) => !p);
  }

  useEffect(() => {
    const endTime = new Date(timerState.endsAt);
    setInterval(() => {
      const now = Date.now();
      const timeLeft = (endTime.getTime() - now) / 1000;
      timeLeft <= 86400 && setShowTimer(true);
    }, 1000);
  }, [timerState.endsAt]);

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
            {!completed && timerState.isActive ? (
              <IoNotificationsSharp onClick={() => onTimerClick(id)} />
            ) : (
              <IoNotificationsOutline onClick={() => onTimerClick(id)} />
            )}
            {task === currentTask ? (
              <TimePicker taskIsActive={timerState.isActive} task={task} />
            ) : null}
          </div>
        </div>
        <div className="task-row-btns">
          <button
            disabled={!user}
            onClick={() => {
              setShowTooltip(!showTooltip);
              setTimeout(() => {
                setShowTooltip(false);
              }, 5000);
            }}
            className="btn btn-secondary priority-btn"
          >
            {priority ? "Change Priority" : "Set Priority"}
          </button>
          <div className="priority-cell">
            <Levels
              showTooltip={showTooltip}
              onClose={handleTooltipClose}
              onPriorityClick={handlePriority}
              task={task}
            />
          </div>
          {
            <button onClick={() => onDelete(task)} className="btn btn-danger">
              Delete
            </button>
          }
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
          {showTimer && (
            <div>
              <Timer timerState={timerState} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default TaskRow;
