import { useQuery } from "@tanstack/react-query";
import {
  getAllPortfolios,
  getAllProjectsByPortfolioId,
  getAllSkillsByPortfolioId,
  getAllUsers,
  getPortfolioById,
  getPortfolioBySlug,
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

export const useGetAllPortfolios = () => {
  return useQuery({
    queryKey: ["getAllPortfolios"], // Fixed key and added limit
    queryFn: async () => getAllPortfolios(),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: typeof window !== "undefined",
  });
};

export const useGetPortfolioById = (portfolioId: string) => {
  return useQuery({
    queryKey: ["getPortfolioById", portfolioId],
    queryFn: () => getPortfolioById(portfolioId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!portfolioId,
  });
};

export const useGetPortfolioBySlug = (portfolioSlug: string) => {
  return useQuery({
    queryKey: ["getPortfolioBySlug", portfolioSlug],
    queryFn: () => getPortfolioBySlug(portfolioSlug),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!portfolioSlug,
  });
};

export const useGetAllSkillsByPortfolioId = (portfolioId: string) => {
  return useQuery({
    queryKey: ["getAllSkillsByPortfolioId", portfolioId],
    queryFn: async () => {
      return await getAllSkillsByPortfolioId(portfolioId);
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
      return await getAllProjectsByPortfolioId(portfolioId);
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: typeof window !== "undefined",
  });
};
