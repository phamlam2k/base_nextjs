import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tab';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthTabs() {
  return (
    <Tabs
      defaultValue="login"
      className="w-[400px]"
    >
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent
        value="login"
        className="mt-4"
      >
        <LoginForm />
      </TabsContent>
      <TabsContent
        value="register"
        className="mt-4"
      >
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}

export default AuthTabs;
