'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import RHFTextField from '@/shared/components/hook-form/rhf-input';
import FormProvider from '@/shared/components/hook-form/form-provider';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const LoginForm = () => {
  const router = useRouter();

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log('Form submitted:', data);
    router.push('/'); // Redirect to home page after successful login
  });

  return (
    <FormProvider
      methods={methods}
      onSubmit={onSubmit}
    >
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>

        <CardContent>
          <RHFTextField
            name="email"
            label="Email"
            title="Email"
            isRequire
            placeholder="Enter email..."
            className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
          />

          <RHFTextField
            name="password"
            type="password"
            label="Password"
            title="Password"
            isRequire
            placeholder="Enter password..."
            className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
          />

          <Button
            type="submit"
            className="w-full dark:bg-slate-800 dark:text-white"
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default LoginForm;
