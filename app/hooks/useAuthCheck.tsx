"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
// import { RootState } from "@/lib/redux/store";
// import { useSelector } from "react-redux";

export function useAuthCheck(redirectUrl = "/") {
  const router = useRouter();
  const { user } = useAuth();
  const [isTokenExpiredState, setIsTokenExpiredState] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const { user } = useSelector((state: RootState) => state.auth);

  function isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      return true;
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("userAccessToken")
        : null;

    if (!token || isTokenExpired(token)) {
      // router.push('/login');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTokenExpiredState(true);
    }
  });

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("userAccessToken")
        : null;

    if (!token) {
      router.push(redirectUrl);
    }
  }, [router, redirectUrl]);

  return { user, isTokenExpiredState };
}
