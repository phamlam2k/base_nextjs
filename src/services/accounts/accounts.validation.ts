import * as z from "zod";

const accountSchemaDefault = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export const createAccountSchema = accountSchemaDefault;

export const updateAccountSchema = accountSchemaDefault.extend({
  id: z.number().int().positive("ID must be a positive integer"),
});
