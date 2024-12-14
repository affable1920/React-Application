import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./../context/UserContext";
import TaskTable from "./common/TaskTable";
import Filter from "../components/Filter";
import SearchBar from "./SearchBar";
import ResetButton from "./ResetButton";
import ResetTimersBtn from "./ResetTimersBtn";
import AdminModal from "./AdminModal";
import { RxCross2 } from "react-icons/rx";
import { LuMenu } from "react-icons/lu";
import { FaSortUp } from "react-icons/fa6";
import AddComponent from "./AddComponent";

const Tasks = ({
  onReset,
  onSelectQuery,
  onSort,
  pages,
  onLoad,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const { user } = useContext(UserContext);

  const ifUserIsAdmin = user && user.userInfo.role === "Admin";

  const [userIsAdmin, setUserIsAdmin] = useState(ifUserIsAdmin);
  const [showAdminLinks, setshowAdminLinks] = useState(user?.role === "Admin");

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

  const constraints = [
    { id: 1, label: "Relevance" },
    { id: 2, label: "Date Added" },
  ];
  console.log(window.innerWidth);

  return (
    <>
      {!user && (
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
          <div className="sorters">
            <div className="sort-select">
              <select
                name="order"
                onChange={(e) => onSelectQuery(e.target.value)}
                className="form-select"
              >
                {constraints.map((c) => (
                  <option value={c.label} key={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <FaSortUp onClick={onSort} className="sort-btn" />
          </div>
        </div>
      </section>
      <div className="main-body">
        <section className="tasks">
          <TaskTable pages={pages} onReset={onReset} />
          <div className="task-footer-btns">
            {user && (
              <NavLink to="/add">
                <button id="add-task-btn" className="btn btn-primary">
                  Add a task Right Now ?
                </button>
              </NavLink>
            )}
            <button
              disabled={!hasNextPage || isFetchingNextPage}
              onClick={onLoad}
              className="btn btn-primary btn-load"
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Tasks;
