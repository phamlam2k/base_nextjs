import { ThemeToggle } from "@/components/layouts/theme-toggle";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-[100vh] flex items-center justify-center relative">
      {children}
      <div className="absolute bottom-5 right-5">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AuthLayout;
