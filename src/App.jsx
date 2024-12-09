import { useEffect, useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import auth from "./services/auth";
import useTasks from "./hooks/useTask";
import TaskContext from "./context/taskContext";
import UserContext from "./context/UserContext";
import AddComponent from "./components/AddComponent";
import Tasks from "./components/Tasks";
import InformationComponent from "./components/InformationComponent";
import TaskComponent from "./components/TaskComponent";
import NavBar from "./components/NavBar";
import AlertTasks from "./components/AlertTasks";
import Portal from "./components/Portal";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import UserProfile from "./components/UserProfile";
import TeamComponent from "./components/TeamComponent";
import TeamForm from "./components/TeamForm";
import "react-toastify/ReactToastify.css";
import "./App.css";
import useCustomQuery from "./hooks/useQuery";

function App() {
  const {
    tasks,
    paginatedTasks,
    currentPage,
    pageSize,
    selectedStatus,
    searchQuery,
    currentTask,
    handleTaskAdd,
    handleChecBoxChange,
    handleDelete,
    handlePageChange,
    setSearchQuery,
    handleStatus,
    handleReset,
    handleTimerClick,
    handleTimer,
    handleTimerCancel,
    resetTimers,
    handleCustomTimer,
    handlePriority,
  } = useTasks();

  const { data, error, isLoading } = useCustomQuery();
  console.log(data);

  let unfinishedTasksMessage =
    "You have some unifinished tasks that are older than a week !";
  let highPriorityTasksMessage =
    "Some high priority tasks need your attention !";
  let generalAlert = "You have pending tasks !";

  const isOlderThanAWeek = (timeStamp) => {
    const creationTime = new Date(timeStamp);
    const now = new Date();
    const ms = now.getTime() - creationTime.getTime();
    const daysPassed = ms / (1000 * 60 * 60 * 24);
    return daysPassed >= 7;
  };

  const unfinishedTasks = tasks.filter(
    ({ completed, history }) =>
      completed === false &&
      isOlderThanAWeek(
        `${history.creation.timeStamp}${new Date().getFullYear()}`
      )
  );
  const highPriorityTasks = tasks.filter(
    (task) => task.priority.toLowerCase() === "high"
  );

  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [portalMessage, setPortalMessage] = useState("");

  useEffect(() => {
    let message = "";
    if (unfinishedTasks.length !== 0) message = unfinishedTasksMessage;
    if (highPriorityTasks.length !== 0) message = highPriorityTasksMessage;
    if (highPriorityTasks.length !== 0 && unfinishedTasks.length !== 0)
      message = generalAlert;

    if (message) {
      setIsOpen(true);
      setPortalMessage(message);
      localStorage.setItem("modalIsOpen", true);
    }
  }, []);

  useEffect(() => {
    const cleanUp = onAuthStateChanged(auth.authInstance, async (user) => {
      if (user) {
        await user.reload();
        const docRef = doc(auth.database, "users", user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists)
          setCurrentUser({ ...user, userInfo: docSnap.data() });
        else setCurrentUser({ ...user });
      } else setCurrentUser(null);

      return () => cleanUp();
    });
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("modalIsOpen", false);
    setPortalMessage("");
  };

  const renderAlertTasks = () => {
    let tasksToRender = [];

    if (unfinishedTasks.length > 0) tasksToRender = unfinishedTasks;
    if (highPriorityTasks.length > 0) tasksToRender = highPriorityTasks;
    if (highPriorityTasks.length > 0 && unfinishedTasks.length > 0) {
      const combinedTasks = [...highPriorityTasks, ...unfinishedTasks];
      tasksToRender = combinedTasks.filter(
        (task, index, self) => index === self.findIndex((t) => t.id === task.id)
      );
    }
    return tasksToRender;
  };

  return (
    <>
      <Portal open={isOpen} onClose={handleClose}>
        <NavLink to="/tasks/alert">
          <button id="btn-modal" className="btn btn-primary">
            Check these tasks
          </button>
        </NavLink>
      </Portal>
      <UserContext.Provider value={{ user: currentUser }}>
        <NavBar />
        <TaskContext.Provider
          value={{
            tasks,
            paginatedTasks,
            alertTasks: unfinishedTasks,
            currentPage,
            pageSize,
            status: selectedStatus,
            searchQuery,
            currentTask,
            onAddTask: handleTaskAdd,
            onCheckBoxChange: handleChecBoxChange,
            onDelete: handleDelete,
            onPageChange: handlePageChange,
            setSearchQuery,
            onStatusChange: handleStatus,
            onTimerClick: handleTimerClick,
            onTimerReset: resetTimers,
            handleTimer,
            handleTimerCancel,
            handleCustomTimer,
            handlePriority,
            user: currentUser,
          }}
        >
          <main>
            <Routes>
              <Route
                path="/add"
                element={<AddComponent onTaskAdd={handleTaskAdd} />}
              />
              <Route path="/" exact element={<Tasks onReset={handleReset} />} />
              <Route path="/task/:id" Component={TaskComponent} />
              <Route
                path="/tasks/:alert"
                element={<AlertTasks tasks={renderAlertTasks()} />}
              />

              <Route path="/register" Component={RegisterForm} />
              <Route path="/login" Component={LoginForm} />
              <Route path="/logout" Component={Logout} />
              <Route path="/profile" Component={UserProfile} />
              <Route path="/teams" Component={TeamComponent} />
              <Route path="/teamform" Component={TeamForm} />
            </Routes>
            <ToastContainer />
          </main>
          <InformationComponent tasks={tasks} alertTasks={renderAlertTasks()} />
        </TaskContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
