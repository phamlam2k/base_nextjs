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
