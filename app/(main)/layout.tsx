"use client";

import { useRouter } from "next/navigation";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/app/lib/auth";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { setUser } = useAuth();
  const { isTokenExpiredState } = useAuthCheck();
  const router = useRouter();

  useEffect(() => {
    if (isTokenExpiredState && typeof window !== "undefined") {
      console.log("Token expired, redirecting to login>>>>>>>>>>>>>");
      toast.error("Unauthorized. Please sign in.", {
        position: "top-right",
        duration: 5000,
      });

      setTimeout(() => {
        router.push("/");
        setUser(null);
        localStorage.clear();
      }, 6000);
    }
  }, [isTokenExpiredState, router, setUser]);

  // Still checking auth → show loading spinner
  // if (loading) {
  //    return <LoadingComponent />;
  // }

  // If not authenticated, avoid rendering protected content before redirect
  // if (!userData) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       Redirecting...
  //     </div>
  //   );
  // }

  return <>{children}</>;
}
