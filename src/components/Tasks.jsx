import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TaskContext from "../context/taskContext";
import UserContext from "./../context/UserContext";
import { RxCross2 } from "react-icons/rx";
import TaskTable from "./common/TaskTable";
import Filter from "../components/Filter";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ResetButton from "./ResetButton";
import ResetTimersBtn from "./ResetTimersBtn";
import { LuMenu } from "react-icons/lu";
import AdminModal from "./AdminModal";

const Tasks = ({ onReset }) => {
  const { user, data: tasks } = useContext(TaskContext);
  const { user: currentUser } = useContext(UserContext);

  const ifUserIsAdmin = currentUser && currentUser.userInfo.role === "Admin";

  const [userIsAdmin, setUserIsAdmin] = useState(ifUserIsAdmin);
  const [showAdminLinks, setshowAdminLinks] = useState(
    currentUser?.role === "Admin"
  );

  useEffect(() => {
    setUserIsAdmin(ifUserIsAdmin);
  }, [ifUserIsAdmin]);

  // const tasksWithLowTimeLeft = tasks.filter(
  //   ({ timerState }) =>
  //     timerState?.remainingTime > 0 && timerState?.remainingTime < 86400
  // );

  const renderAlertBox = () => {
    return (
      <div className="low-timer-alert">
        <div className="low-timer-alert-header">
          <RxCross2 style={{ cursor: "pointer" }} />
          <p>Timers for some tasks ending soon !</p>
        </div>
        <button className="btn btn-danger">Check these out</button>
      </div>
    );
  };

  function handleAdminBarVisibility() {
    setshowAdminLinks((prev) => !prev);
  }

  return (
    <>
      {!currentUser && (
        <div className="alert-box">
          <div className="alert-box-body">
            <NavLink to="/login">Login to access all features !</NavLink>
          </div>
        </div>
      )}
      <section className="flex-nav">
        <SearchBar />
        <div className="admin-bar">
          {showAdminLinks && <AdminModal />}
          {userIsAdmin && (
            <LuMenu onClick={handleAdminBarVisibility} id="admin-menu" />
          )}
        </div>
        <div className="task-buttons">
          <Filter />
          <ResetButton onReset={onReset} />
          {user && <ResetTimersBtn />}
        </div>
      </section>
      <section className="tasks">
        <TaskTable onReset={onReset} />
        <Pagination />
        {user && (
          <NavLink to="/add">
            <button id="add-task-btn" className="btn btn-primary">
              Add a task Right Now ?
            </button>
          </NavLink>
        )}
      </section>
    </>
  );
};

export default Tasks;
