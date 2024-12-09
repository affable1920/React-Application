import { useInfiniteQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import auth from "../services/auth";

const useCustomQuery = () => {
  return useInfiniteQuery({
    queryKey: ["tasks"],
    queryFn: async ({ pageParam = 1 }) => {
      const querySnapshot = await getDocs(collection(auth.database, "tasks"));
      return querySnapshot.docs.map((doc) => doc.data());
    },
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
  });
};
export default useCustomQuery;
