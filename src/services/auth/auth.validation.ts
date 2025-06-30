import * as z from "zod";

const authShemaDefault = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

export const loginSchema = authShemaDefault.pick({
  email: true,
  password: true,
});

export const registerSchema = authShemaDefault.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);
