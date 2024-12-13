import { useInfiniteQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import auth from "../services/auth";

const useCustomQuery = ({ pageSize }) => {
  return useInfiniteQuery({
    queryKey: ["tasks"],
    queryFn: async ({ pageParam }) => {
      const tasksRef = collection(auth.database, "tasks");
      let queryArray = [orderBy("id"), limit(pageSize || 8)];

      const querySnap = pageParam
        ? query(tasksRef, ...queryArray, startAt(pageParam))
        : query(tasksRef, ...queryArray);
      const docSnap = await getDocs(querySnap);

      return docSnap.docs.map((doc) => doc.data());
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length !== 0 ? allPages.length + 1 : undefined,
  });
};

export default useCustomQuery;
