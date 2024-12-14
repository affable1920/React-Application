import { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import paginate from "./../services/paginate";
import { months } from "../services/date-timer-service";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import auth from "../services/auth";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentTask, setCurrentTask] = useState(null);

  const tns = "Timer Not Set";

  const status = {
    completed: "Finished",
    notCompleted: "Not Finished",
  };

  useEffect(() => {
    const updatedPageSize = () => {
      setPageSize(window.innerWidth < 768 ? 7 : 16);
      setCurrentPage(1);
    };

    updatedPageSize();
    window.addEventListener("resize", updatedPageSize);
    window.addEventListener("visibilitychange", updatedPageSize);
    return () => {
      window.removeEventListener("resize", updatedPageSize);
      window.removeEventListener("visibilitychange", updatedPageSize);
    };
  }, [window.innerWidth]);

  const filteredTasks = useMemo(() => {
    const requiredTasks = tasks;
    if (searchQuery === "" && selectedStatus === "") return requiredTasks;
    if (searchQuery) {
      if (selectedStatus) {
        const statusTasks = requiredTasks.filter((task) =>
          selectedStatus === status.completed
            ? task.completed === true
            : selectedStatus === status.notCompleted
            ? task.completed === false
            : task.completed === true
        );
        return statusTasks.filter(({ title }) =>
          title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return requiredTasks.filter(({ title }) =>
        title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedStatus) {
      if (searchQuery) {
        setSelectedStatus("");
        return requiredTasks.filter(({ title }) =>
          title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return requiredTasks.filter((task) =>
        selectedStatus === status.completed
          ? task.completed === true
          : selectedStatus === status.notCompleted
          ? task.completed === false
          : task.completed === true
      );
    }
  }, [tasks, selectedStatus, searchQuery]);

  const paginatedTasks = useMemo(() => {
    return paginate(filteredTasks, pageSize, currentPage);
  }, [filteredTasks, currentPage]);

  const handleStatus = () => {
    if (selectedStatus === "") {
      setSelectedStatus(status.completed);
      setCurrentPage(1);
    } else {
      selectedStatus === status.completed
        ? setSelectedStatus(status.notCompleted)
        : selectedStatus === status.notCompleted
        ? setSelectedStatus(status.completed)
        : setSelectedStatus(status.notCompleted);
      setCurrentPage(1);
    }
  };

  const handleTaskAdd = (data, event) => {};

  const handleChecBoxChange = useCallback((e, task) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id
        ? {
            ...t,
            completed: e.target.checked
              ? true
              : !e.target.checked
              ? false
              : true,
            history: {
              ...t.history,
              events: [
                ...t.history.events,
                {
                  name: e.target.checked
                    ? "Task marked as Finished"
                    : "Task marked as unfinished",
                  timeStamp: renderCreationTime(),
                },
              ],
            },
          }
        : t
    );
    setTasks(updatedTasks);
    updateDoc(doc(auth.database, "tasks", task?.id), {
      completed: e.target.checked,
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  });

  const handleDelete = (task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    deleteDoc(doc(auth.database, "tasks", task?.id));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    setCurrentPage(1);
    setSearchQuery("");
    setSelectedStatus("");
  };

  const renderCreationTime = () => {
    const date = new Date();

    const dated = date.getDate();
    const month = months[date.getUTCMonth()];
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${dated} ${month} ${hour}:${minutes} `;
  };

  const renderTimerEndTime = (ms) => {
    const date = new Date();
    date.setMilliseconds(ms);
    return date.toLocaleString();
  };

  const handleTimerClick = (taskId) => {
    const clickedTask = tasks.find((task) => task.id === taskId);
    setCurrentTask((prevVal) => {
      if (prevVal === null || (prevVal?.id && prevVal?.id !== taskId))
        return clickedTask;
      if (prevVal?.id && prevVal?.id === taskId) return null;
    });
  };

  const handleTimer = useCallback((task, timeSpan, event) => {
    let times = timeSpan.includes("min")
      ? timeSpan.replace(/\min/g, " * 60")
      : timeSpan.replace(/\hr/g, " * 3600");

    let timeInS = eval(times);
    const timeInMs = timeInS * 1000;

    const updatedTask = {
      ...task,
      timerState: {
        ...task.timerState,
        isActive: true,
        createdAt: renderCreationTime(),
        endsAt: renderTimerEndTime(timeInMs),
        remainingTime: timeInS,
      },
      history: {
        ...task.history,
        events: [
          ...task.history.events,
          { name: event.name, timeStamp: renderCreationTime() },
        ],
      },
    };

    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
    setTasks(updatedTasks);
    updateDoc(doc(auth.database, "tasks", task.id), updatedTask);
    createNotification(`Timer set for '${task.title}'`);

    let timeOut = setTimeout(() => {
      const updatedTasks = tasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              timerState: {
                ...t.timerState,
                isActive: false,
                createdAt: tns,
                endsAt: tns,
                remainingTime: tns,
              },
            }
          : t
      );
      setTasks(updatedTasks);
      updateDoc(doc(auth.database, "tasks", task.id), {
        timerState: {
          isActive: false,
          createdAt: tns,
          endsAt: tns,
          remainingTime: tns,
        },
      });
      createNotification("Time Up");
    }, timeInMs);
    return () => clearTimeout(timeOut);
  });

  const createNotification = (message) => {
    toast.dark(message);

    const audio = new Audio("../src/assets/timerSet.wav");
    audio.play();
  };

  const handleTimerCancel = (task, event) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id
        ? {
            ...t,
            timerState: {
              ...t.timerState,
              isActive: false,
              remainingTime: "Timer not Set",
              endsAt: "Timer not Set",
              createdAt: "Timer not Set",
            },
            history: {
              ...t.history,
              events: [
                ...t.history.events,
                { name: event.name, timeStamp: renderCreationTime() },
              ],
            },
          }
        : t
    );
    setTasks(updatedTasks);
    createNotification(`Timer for '${task.title}' cancelled`);
  };

  const resetTimers = (event) => {
    const resettedTasks = tasks.map((task) => ({
      ...task,
      timerState: { ...task.timerState, isActive: false },
      history: {
        ...task.history,
        events: [
          ...task.history.events,
          { name: event.name, timeStamp: renderCreationTime() },
        ],
      },
    }));
    setTasks(resettedTasks);
    createNotification("All timers Reset");
  };

  const handleCustomTimer = useCallback((task, timeSpan, event) => {
    const splitted = timeSpan.split("T");
    const d = splitted[0].split("-");
    const t = splitted[1].split(":");

    const year = parseInt(d[0]);
    const month = parseInt(d[1]);
    const date = parseInt(d[2]);
    const hrs = parseInt(t[0]);
    const mins = parseInt(t[1]);

    const targetDate = new Date(year, month - 1, date, hrs, mins, 0);
    const now = new Date();

    const ms = targetDate.getTime() - now.getTime();
    const totalSeconds = Math.floor(ms / 1000);
    const months = Math.floor(ms / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 30);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);

    let timeLeft = [];
    if (months > 0) timeLeft.push(`${months} months`);
    if (days > 0) timeLeft.push(`${days} days`);
    if (hours > 0) timeLeft.push(`${hours} hours`);
    if (minutes > 0) timeLeft.push(`${minutes} minutes`);
    if (seconds > 0) timeLeft.push(`${seconds} seconds`);

    const updatedTask = {
      ...task,
      timerState: {
        ...task.timerState,
        isActive: true,
        createdAt: renderCreationTime(),
        endsAt: targetDate.toLocaleString(),
        remainingTime: totalSeconds,
      },
      history: {
        ...task.history,
        events: [
          ...task.history.events,
          { name: event.name, timeStamp: renderCreationTime() },
        ],
      },
    };
    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
    setTasks(updatedTasks);
    createNotification(`Timer Set for ${timeLeft.map((t) => t.toString())}`);
    let timeOut = setTimeout(() => {
      const updatedTasks = tasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              timerState: {
                ...t.timerState,
                isActive: false,
                endsAt: tns,
                remainingTime: tns,
                createdAt: tns,
              },
            }
          : t
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      createNotification("Time Up");
    }, ms);
    return () => clearTimeout(timeOut);
  });

  const handlePriority = useCallback((task, priority, event) => {
    const updatedTask = {
      ...task,
      priority: priority,
      history: {
        ...task.history,
        events: [
          ...task.history.events,
          { name: event.name, timeStamp: renderCreationTime() },
        ],
      },
    };
    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
    setTasks(updatedTasks);
    updateDoc(doc(auth.database, "tasks", task?.id), updatedTask);
  });

  return {
    tasks,
    paginatedTasks,
    pageSize,
    currentPage,
    searchQuery,
    selectedStatus,
    currentTask,
    handleTaskAdd,
    handleChecBoxChange,
    handleDelete,
    handlePageChange,
    handleStatus,
    handleReset,
    handleTimerClick,
    handleTimer,
    handleTimerCancel,
    setSearchQuery,
    resetTimers,
    handleCustomTimer,
    handlePriority,
  };
};

export default useTasks;
