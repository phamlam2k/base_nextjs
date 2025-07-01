import AccountView from "@/features/accounts/views/account.view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts",
  description: "Manage your accounts",
};

const AccountsPage = () => {
  return <AccountView />;
};

export default AccountsPage;
