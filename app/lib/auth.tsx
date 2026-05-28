"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getAllUsers,
  loginUser,
  LoginUserProps,
  registerUser,
  RegisterUserProps,
} from "@/app/services/api";

// export interface PortfolioData {
//   name: string;
//   tagline: string;
//   greeting: string;
//   bioShort: string;
//   bioLong: string;
//   whatsapp: string;
//   email: string;
//   avatarUrl?: string;
//   skills: { name: string; level: number }[];
//   projects: { title: string; description: string; link: string; image?: string }[];
// }

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  portfolioId: string;
  link: string;
}

export interface Portfolio {
  id: string;
  title: string;
  bio: string;
  theme: string;
  published: boolean;
  userId: string;
  projects: Project[];

  name: string;
  tagline: string;
  greeting: string;
  bioShort: string;
  bioLong: string;
  whatsapp: string;
  email: string;
  avatarUrl?: string;
  skills: { name: string; level: number }[];
}

export interface SocialLink {
  id: string;
  url: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  username: string;
}

// interface DbShape {
//   users: Record<string, User & { password: string }>;
//   byUsername: Record<string, string>;
// }

// const STORAGE_KEY = "shosan_db_v1";
// const SESSION_KEY = "shosan_session_v1";

interface AuthCtx {
  user: User | null;
  setUser: (user: User | null) => void;
  register: (payload: RegisterUserProps) => Promise<void>;
  login: (payload: LoginUserProps) => Promise<void>;
  logout: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listAllUsers: () => Promise<Array<User | any>>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

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

  const listAllUsers: AuthCtx["listAllUsers"] = useCallback(async () => {
    const res = await getAllUsers();
    console.log("All users fetched successfully:>>>>>>>>>>>>", res);
    return res.data;
  }, []);

  return (
    <Ctx.Provider
      value={{ user, setUser, register, login, logout, listAllUsers }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
};
