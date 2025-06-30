import * as z from "zod";
import { loginSchema, registerSchema } from "./auth.validation";

export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterPayload = z.infer<typeof registerSchema>;
