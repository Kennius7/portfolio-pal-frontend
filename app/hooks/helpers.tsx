import { useQuery } from "@tanstack/react-query";
import {
  getAllProjectsByPortfolioId,
  getAllSkillsByPortfolioId,
  getAllUsers,
  getPortfolioById,
} from "../services/api";

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

export const useGetPortfolioById = (portfolioId: string) => {
  return useQuery({
    queryKey: ["getPortfolioById", portfolioId],
    queryFn: async () => {
      return await getPortfolioById(portfolioId);
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: typeof window !== "undefined",
  });
};

export const useGetAllSkillsByPortfolioId = (portfolioId: string) => {
  return useQuery({
    queryKey: ["getAllSkillsByPortfolioId", portfolioId],
    queryFn: async () => {
      return await getAllSkillsByPortfolioId({ portfolioId });
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: typeof window !== "undefined",
  });
};

export const useGetAllProjectsByPortfolioId = (portfolioId: string) => {
  return useQuery({
    queryKey: ["getAllProjectsByPortfolioId", portfolioId],
    queryFn: async () => {
      return await getAllProjectsByPortfolioId({ portfolioId });
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: typeof window !== "undefined",
  });
};
