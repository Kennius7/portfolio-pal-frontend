import { SkillCategory } from "../constants/skillCategories";

export interface Portfolio {
  id: string;
  title: string;
  theme: string;
  published: boolean;
  tagline: string;
  greeting: string;
  bioShort: string;
  bioLong: string;
  whatsapp: string;
  email: string;
  avatarUrl: string;
  resumeUrl: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  imageUrl: string;
  portfolioId: string;
  category: SkillCategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  portfolioId: string;
  projectCreatedAt: Date;
  projectEndAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  username: string;
  portfolio: Portfolio;
}

export interface CreatePortfolioProps {
  id?: string;
  userId?: string;
  title: string;
  theme: string;
  published: boolean;
  tagline: string;
  greeting: string;
  bioShort: string;
  bioLong: string;
  whatsapp: string;
  email: string;
  avatarUrl: string;
  resumeUrl: string;
}

export interface RegisterUserProps {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

export interface LoginUserProps {
  email: string;
  password: string;
}

export interface CreateSkillProps {
  name: string;
  description: string;
  level: number;
  imageUrl: string;
  portfolioId: string;
  category: SkillCategory;
}

export interface CreateProjectProps {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  portfolioId: string;
  projectCreatedAt: Date;
  projectEndAt: Date;
}
