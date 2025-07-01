"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function AuthView() {
  const [tabValue, setTabValue] = useState("login");

  return (
    <Tabs
      style={{ width: "400px", height: "600px" }}
      value={tabValue}
      onValueChange={setTabValue}
    >
      <TabsList className="w-full">
        <TabsTrigger data-testid="login-tab" value="login">
          Login
        </TabsTrigger>
        <TabsTrigger data-testid="register-tab" value="register">
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="login"
        className="p-4 rounded bg-white dark:bg-zinc-800 shadow"
      >
        <LoginForm />
      </TabsContent>
      <TabsContent
        value="register"
        className="p-4 rounded bg-white dark:bg-zinc-800 shadow"
      >
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}

export default AuthView;
