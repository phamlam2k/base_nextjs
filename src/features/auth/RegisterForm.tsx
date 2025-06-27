'use client';

import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useRegister } from '@/services/auth/register.api';
import registerSchema from '@/validations/auth/register.validation';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterForm = () => {
  const router = useRouter();
  const { mutateAsync: register, isPending } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      toast.success('Registered successfully!');
      router.push('/');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Enter your credentials to register</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name..."
                      className="bg-slate-100 dark:bg-slate-500 border-0 text-black dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email..."
                      className="bg-slate-100 dark:bg-slate-500 border-0 text-black dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password..."
                      className="bg-slate-100 dark:bg-slate-500 border-0 text-black dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password..."
                      className="bg-slate-100 dark:bg-slate-500 border-0 text-black dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              style={{ marginTop: '2rem' }}
              type="submit"
              disabled={isPending}
              className="w-full dark:bg-slate-800 dark:text-white"
            >
              {isPending ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
