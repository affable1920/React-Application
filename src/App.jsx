import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./components/Providers/AuthProvider";
import useTasks from "./hooks/useTasks";
import AddComponent from "./components/AddComponent";
import Tasks from "./components/Tasks";
import TaskComponent from "./components/TaskComponent";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import TeamComponent from "./components/TeamComponent";
import TeamForm from "./components/TeamForm";
import "react-toastify/ReactToastify.css";
import "./App.css";

function App() {
  const [query, setQuery] = useState({ pageSize: 7 });
  const [isOpen, setIsOpen] = useState(false);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useTasks(query);

  return (
    <>
      <AuthProvider>
        <NavBar />
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
            <Route path="/register" Component={RegisterForm} />
            <Route path="/login" Component={LoginForm} />
            <Route path="/logout" Component={Logout} />
            <Route path="/teams" Component={TeamComponent} />
            <Route path="/teamform" Component={TeamForm} />
          </Routes>
          <ToastContainer />
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
