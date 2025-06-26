'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import RHFTextField from '@/components/forms/rhf-input';
import loginSchema from '@/validations/auth/login.validation';
import FormProvider from '@/providers/FormProvider';
import { useLogin } from '@/services/auth/login.api';

const defaultValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();

  const methods = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await login(data);
      toast.success('Logged in successfully!');
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  });

  return (
    <FormProvider
      methods={methods}
      onSubmit={onSubmit}
    >
      <Card className="w-full max-w-md mx-auto shadow">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
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
            disabled={isPending}
            className="w-full dark:bg-slate-800 dark:text-white"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default LoginForm;
