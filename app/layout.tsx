import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/app/lib/auth";
import { Toaster } from "sonner";
import "./globals.css";
import QueryProvider from "./components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Pal",
  description: "Dashboard for porfolio creation and management",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <QueryProvider>
          <AuthProvider>
            {children}
            <div className="fixed z-60 top-8 right-4">
              <Toaster position="top-right" richColors />
            </div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
