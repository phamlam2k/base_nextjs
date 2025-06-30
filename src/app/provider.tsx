"use client";

import ThemeProvider from "@/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({});

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="dashboard-theme"
    >
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
