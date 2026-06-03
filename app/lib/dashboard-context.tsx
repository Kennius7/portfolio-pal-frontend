"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  CreateProjectProps,
  CreateSkillProps,
  Portfolio,
} from "../types/types";
import { SkillCategory } from "../constants/skillCategories";

const initialSkillState = {
  name: "",
  description: "",
  level: 1,
  imageUrl: "",
  category: SkillCategory.FRONTEND_DEVELOPMENT,
  portfolioId: "",
};

const initialProjectState = {
  title: "",
  description: "",
  imageUrl: "",
  liveUrl: "",
  projectCreatedAt: new Date(),
  projectEndAt: new Date(),
  portfolioId: "",
};

interface DashboardCtx {
  portfolioForm: Portfolio | null;
  setPortfolioForm: React.Dispatch<React.SetStateAction<Portfolio | null>>;
  skills: CreateSkillProps;
  setSkills: React.Dispatch<React.SetStateAction<CreateSkillProps>>;
  projects: CreateProjectProps;
  setProjects: React.Dispatch<React.SetStateAction<CreateProjectProps>>;
  isPreviewing: boolean;
  setIsPreviewing: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardCtx = createContext<DashboardCtx | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [portfolioForm, setPortfolioForm] = useState<Portfolio | null>(null);
  const [skills, setSkills] = useState<CreateSkillProps>(initialSkillState);
  const [projects, setProjects] =
    useState<CreateProjectProps>(initialProjectState);
  const [isPreviewing, setIsPreviewing] = useState(false);

  return (
    <DashboardCtx.Provider
      value={{
        portfolioForm,
        setPortfolioForm,
        skills,
        setSkills,
        projects,
        setProjects,
        isPreviewing,
        setIsPreviewing,
      }}
    >
      {children}
    </DashboardCtx.Provider>
  );
}

export const useDashboard = () => {
  const c = useContext(DashboardCtx);
  if (!c) throw new Error("useDashboard must be used within DashboardProvider");
  return c;
};
