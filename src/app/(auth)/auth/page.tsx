import AuthTabs from "@/features/auth/AuthTabs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Authen",
  description: "Logic Authen",
};

const AuthPage = () => {
  return <AuthTabs />;
};

export default AuthPage;
