"use client"

/* eslint-disable prettier/prettier */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable prettier/prettier */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  getAllUsers,
  loginUser,
  LoginUserProps,
  registerUser,
  RegisterUserProps,
} from "@/app/services/api";

export interface PortfolioData {
  name: string;
  tagline: string;
  greeting: string;
  bioShort: string;
  bioLong: string;
  whatsapp: string;
  email: string;
  avatarUrl?: string;
  skills: { name: string; level: number }[];
  projects: { title: string; description: string; link: string; image?: string }[];
}

export interface User {
  id: string;
  email: string;
  fullName: string;
}

interface DbShape {
  users: Record<string, User & { password: string }>;
  byUsername: Record<string, string>;
}

const STORAGE_KEY = "shosan_db_v1";
const SESSION_KEY = "shosan_session_v1";

interface AuthCtx {
  user: User | null;
  register: (payload: RegisterUserProps) => Promise<void>;
  login: (payload: LoginUserProps) => Promise<void>;
  logout: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listAllUsers: () => Promise<Array<User | any>>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const register: AuthCtx["register"] = async (payload: RegisterUserProps) => {
    const res = await registerUser({ payload });
    console.log("User registered successfully:>>>>>>>>>>>>", res);
  };

  const login: AuthCtx["login"] = async (payload: LoginUserProps) => {
    const res = await loginUser({ payload });
    console.log("User logged in successfully:>>>>>>>>>>>>", res);
    // localStorage.setItem(SESSION_KEY, res.user.id);
    localStorage.setItem("userToken", res.token);
    // const { password: _p, ...rest } = res.user;
    setUser(res.user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const listAllUsers: AuthCtx["listAllUsers"] = async () => {
    const res = await getAllUsers();
    console.log("All users fetched successfully:>>>>>>>>>>>>", res);
    return res.data;
  };

  return (
    <Ctx.Provider value={{ user, register, login, logout, listAllUsers }}>{children}</Ctx.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
};
