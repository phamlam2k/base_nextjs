import * as z from "zod";
import { createAccountSchema } from "./accounts.validation";

export type AccountFilter = {
  page: number;
  pageSize: number;
  sortOrder?: "asc" | "desc";
  sortBy: keyof AccountListData;
};

export interface AccountListData {
  id: number;
  name: string;
  email: string;
}

export type AccountFormPayload = z.infer<typeof createAccountSchema>;
