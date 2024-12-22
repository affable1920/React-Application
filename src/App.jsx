import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import useCustomQuery from "./hooks/useQuery";
import auth from "./services/auth";
import TaskContext from "./context/taskContext";
import UserContext from "./context/UserContext";
import AddComponent from "./components/AddComponent";
import Tasks from "./components/Tasks";
import TaskComponent from "./components/TaskComponent";
import NavBar from "./components/NavBar";
import AlertTasks from "./components/AlertTasks";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import UserProfile from "./components/UserProfile";
import TeamComponent from "./components/TeamComponent";
import TeamForm from "./components/TeamForm";
import "react-toastify/ReactToastify.css";
import "./App.css";

function App() {
  const [pageSize, setPageSize] = useState(7);
  const [query, setQuery] = useState({ pageSize });

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useCustomQuery(query);

  useEffect(() => {
    const updatedPageSize = () => {
      setPageSize(window.innerWidth < 768 ? 7 : 16);
    };

    updatedPageSize();
    window.addEventListener("resize", updatedPageSize);
    window.addEventListener("visibilitychange", updatedPageSize);
    return () => {
      window.removeEventListener("resize", updatedPageSize);
      window.removeEventListener("visibilitychange", updatedPageSize);
    };
  }, [window.innerWidth]);

  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [portalMessage, setPortalMessage] = useState("");

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

  const setQuerySearchString = (searchString) => {
    setQuery({ ...query, searchString });
  };

  return (
    <>
      {/* <Portal open={isOpen} onClose={handleClose}>
        <NavLink to="/tasks/alert">
          <button id="btn-modal" className="btn btn-primary">
            Check these tasks
          </button>
        </NavLink>
      </Portal> */}
      <UserContext.Provider value={{ user: currentUser }}>
        <NavBar />
        <TaskContext.Provider
          value={{
            pageSize,
            setQuerySearchString,
          }}
        >
          <main>
            <Routes>
              <Route path="/add" element={<AddComponent />} />
              <Route
                path="/"
                exact
                element={
                  <Tasks
                    pages={data?.pages}
                    onLoad={fetchNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    hasNextPage={hasNextPage}
                  />
                }
              />
              <Route path="/task/:id" Component={TaskComponent} />
              <Route path="/tasks/:alert" element={<AlertTasks />} />

              <Route path="/register" Component={RegisterForm} />
              <Route path="/login" Component={LoginForm} />
              <Route path="/logout" Component={Logout} />
              <Route path="/profile" Component={UserProfile} />
              <Route path="/teams" Component={TeamComponent} />
              <Route path="/teamform" Component={TeamForm} />
            </Routes>
            <ToastContainer />
          </main>
          {/* <InformationComponent tasks={tasks} alertTasks={renderAlertTasks()} /> */}
        </TaskContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
