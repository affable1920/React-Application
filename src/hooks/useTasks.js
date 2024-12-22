import { useInfiniteQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import auth from "../services/auth";

const useTasks = ({ pageSize }) => {
  return useInfiniteQuery({
    queryKey: ["tasks"],
    queryFn: async ({ pageParam }) => {
      const tasksRef = collection(auth.database, "tasks");
      let queryArray = [orderBy("timeStamp", "desc"), limit(pageSize)];

      const querySnap = pageParam
        ? query(tasksRef, ...queryArray, startAfter(pageParam))
        : query(tasksRef, ...queryArray);
      const docSnap = await getDocs(querySnap);
      const tasks = docSnap.docs.map((doc) => doc.data());
      const lastVisible = docSnap.docs[docSnap.docs.length - 1];

      return { tasks, lastVisible };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.tasks.length < pageSize || !lastPage.lastVisible
        ? undefined
        : lastPage.lastVisible;
    },
    keepPreviousData: true,
  });
};

export default useTasks;
