'use client';

import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tab';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthTabs() {
  const [tabValue, setTabValue] = useState('login');

  return (
    <div
      className="
        mx-auto 
        p-4 
        rounded 
        shadow 
  
      "
      style={{ width: '500px', height: '600px' }}
    >
      <Tabs
        value={tabValue}
        onValueChange={setTabValue}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2 gap-2 mb-2">
          <TabsTrigger
            data-testid="login-tab"
            value="login"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            data-testid="register-tab"
            value="register"
          >
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="login"
          className="p-4 rounded bg-slate-400 dark:bg-zinc-800 shadow"
        >
          <LoginForm />
        </TabsContent>
        <TabsContent
          value="register"
          className="p-4 rounded bg-slate-400 dark:bg-zinc-800 shadow"
        >
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthTabs;
