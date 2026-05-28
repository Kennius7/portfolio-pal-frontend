import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/api";

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["getAllUsers"], // Fixed key and added limit
    queryFn: async () => {
      return await getAllUsers();
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: typeof window !== "undefined",
  });
};
