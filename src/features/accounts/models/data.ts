export interface AccountListData {
  id: string;
  name: string;
  email: string;
}

const accountListData: AccountListData[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
  },
];

export default accountListData;
