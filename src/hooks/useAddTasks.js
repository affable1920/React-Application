import { QueryClient, useMutation } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import auth from "../services/auth";

const useAddTasks = () => {
  const history = {
    events: [],
  };
  const timerState = {
    isActive: false,
    createdAt: "Timer Not Set",
    remainingTime: "Timer Not Set",
    endsAt: "Timer Not Set",
  };
  const taskKeys = {
    timeStamp: new Date(),
    completed: false,
    timerState,
    history,
  };

  const queryClient = new QueryClient();

  return useMutation({
    mutationKey: ["tasks"],
    mutationFn: (newTask) =>
      addDoc(collection(auth.database, "tasks"), {
        ...newTask,
        ...taskKeys,
      }),
  });
};

export default useAddTasks;
