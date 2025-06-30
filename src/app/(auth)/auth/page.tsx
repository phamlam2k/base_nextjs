import AuthView from "@/features/auth/views/auth.view";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Authen",
  description: "Logic Authen",
};

const AuthPage = () => {
  return <AuthView />;
};

export default AuthPage;
