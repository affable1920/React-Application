import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import TaskContext from "./../context/taskContext";
import TimePicker from "./TimePicker";

const TaskComponent = () => {
  const { state: task } = useLocation();
  const params = useParams();

  const { history, timerState } = task;
  const { events } = history;
  const { onTimerClick, currentTask } = useContext(TaskContext);
  console.log(task);

  return (
    <div id="task-component">
      <header className="component-header">
        <h3>Task Records: {params.id}</h3>
      </header>
      <div className="component-body">
        <section className="task-tracker">
          <h3>Task Tracker</h3>
          <div className="events">
            <span>
              {history.creation["name"]} - {history.creation["timeStamp"]}
            </span>
            {events.map((event) => (
              <span
                className="task-event"
                key={event.timeStamp + Math.random()}
              >
                {event.name} - {event.timeStamp}
              </span>
            ))}
          </div>
        </section>
        <section className="timer-section">
          {timerState.isActive ? (
            <div id="timer-details">
              <p id="timer-end">Timer ends at: {timerState.endsAt}</p>
            </div>
          ) : (
            <>
              <button
                onClick={() => onTimerClick(task.id)}
                className="btn btn-primary"
              >
                Set Timer
              </button>
              {task?.id === currentTask?.id && (
                <span>
                  <TimePicker task={task} taskIsActive={timerState.isActive} />
                </span>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default TaskComponent;
