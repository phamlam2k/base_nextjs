"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { useLogoutMutate } from "@/services/auth/auth.api";

const Navbar = () => {
  const router = useRouter();
  const { mutate: logout, isPending } = useLogoutMutate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        router.push("/auth");
      },
      onError: () => {
        toast.error("Logout failed");
      },
    });
  };

  return (
    <header className="bg-primary dark:bg-slate-700">
      <nav className="max-w-screen-xl mx-auto flex justify-between text-white py-2 px-5">
        <Link href="/">Home</Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger>Long</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="w-full text-left"
                >
                  {isPending ? "Logging out..." : "Logout"}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
