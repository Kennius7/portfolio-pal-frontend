"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loginUser, registerUser } from "@/app/services/api";
import { LoginUserProps, RegisterUserProps, User } from "../types/types";

export interface SocialLink {
  id: string;
  url: string;
}

interface AuthCtx {
  user: User | null;
  setUser: (user: User | null) => void;
  register: (payload: RegisterUserProps) => Promise<void>;
  login: (payload: LoginUserProps) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAdmin = (user && user.email !== "ogbogukenny@yahoo.com") || false;

  useEffect(() => {
    const preservedUser = JSON.parse(
      localStorage.getItem("currentUser") || "null",
    );
    if (preservedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(preservedUser);
    }
  }, []);

  const register: AuthCtx["register"] = async (payload: RegisterUserProps) => {
    const res = await registerUser({ payload });
    console.log("User registered successfully:>>>>>>>>>>>>", res);
  };

  const login: AuthCtx["login"] = async (payload: LoginUserProps) => {
    const res = await loginUser({ payload });
    console.log("User logged in successfully:>>>>>>>>>>>>", res);
    // localStorage.setItem(SESSION_KEY, res.user.id);
    const loggedInUser = JSON.stringify(res.user);
    localStorage.setItem("userAccessToken", res.token.accessToken);
    localStorage.setItem("userRefreshToken", res.token.refreshToken);
    localStorage.setItem("currentUser", loggedInUser);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, setUser, register, login, logout, isAdmin }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
};
