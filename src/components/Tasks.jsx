import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./../context/UserContext";
import TaskTable from "./common/TaskTable";
import Filter from "../components/Filter";
import SearchBar from "./SearchBar";
import ResetButton from "./ResetButton";
import ResetTimersBtn from "./ResetTimersBtn";
import AdminModal from "./AdminModal";
import { LuMenu } from "react-icons/lu";
import { FaSortUp } from "react-icons/fa6";

const Tasks = ({ onReset, pages, onLoad, hasNextPage, isFetchingNextPage }) => {
  const { currentUser } = useContext(UserContext);

  const ifUserIsAdmin = currentUser && currentUser.userInfo.role === "Admin";

  const [userIsAdmin, setUserIsAdmin] = useState(ifUserIsAdmin);
  const [showAdminLinks, setshowAdminLinks] = useState(
    currentUser?.role === "Admin"
  );

  useEffect(() => {
    setUserIsAdmin(ifUserIsAdmin);
  }, [ifUserIsAdmin]);

  function handleAdminBarVisibility() {
    setshowAdminLinks((prev) => !prev);
  }

  return (
    <>
      {!currentUser && (
        <div className="bg-red-800 text-center text-sm text-white font-semibold ">
          <NavLink className="cursor-pointer" to="/login">
            Login to access all features !
          </NavLink>
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
          {currentUser && <ResetTimersBtn />}
          <FaSortUp className="sort-btn" />
        </div>
      </section>
      <div className="main-body">
        <section className="tasks">
          <TaskTable pages={pages} onReset={onReset} />
          <div className="task-footer-btns">
            {currentUser && (
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
