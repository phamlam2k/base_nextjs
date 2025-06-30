import { useMemo, useRef, useState } from "react";
import data, { AccountListData } from "../models/data";
import { DataTableRef } from "@/components/tables/data-table";

export type AccountFilter = {
  page: number;
  pageSize: number;
  sortOrder?: "asc" | "desc";
  sortBy: keyof AccountListData;
};

const useAccountController = () => {
  const tableRef = useRef<DataTableRef>(null);
  const [accountList, setAccountList] = useState<AccountListData[]>(data);

  const [filter, setFilter] = useState<AccountFilter>({
    page: 1,
    pageSize: 10,
    sortOrder: "asc",
    sortBy: "name",
  });

  const accountListData: AccountListData[] = useMemo(() => {
    const { page, pageSize, sortOrder, sortBy } = filter;

    let _accountList = [...accountList];

    if (sortOrder === "asc") {
      _accountList.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    } else {
      _accountList.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    _accountList = _accountList.slice(startIndex, endIndex);

    return _accountList;
  }, [accountList, filter]);

  const createAccount = (account: AccountListData) => {
    const _accountList = [...accountList];

    const newAccount = {
      ...account,
      id: (_accountList.length + 1).toString(),
    };

    _accountList.push(newAccount);

    setAccountList(_accountList);
  };

  const updateAccount = (account: AccountListData) => {
    const _accountList = [...accountList];

    const index = _accountList.findIndex((a) => a.id === account.id);

    if (index !== -1) {
      _accountList[index] = {
        ..._accountList[index],
        ...account,
      };

      return _accountList[index];
    }

    setAccountList(_accountList);
  };

  const handleFilterChange = (newFilter: Partial<AccountFilter>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };

  return {
    filter,
    tableRef,
    accountListData,

    createAccount,
    updateAccount,

    handleFilterChange,
  };
};

export default useAccountController;
