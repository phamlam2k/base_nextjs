import { useMemo, useRef, useState } from "react";
import data, { AccountListData } from "../models/data";
import { DataTableRef } from "@/components/tables/data-table";
import { sortByField } from "@/lib/utils";

export type AccountFilter = {
  page: number;
  pageSize: number;
  sortOrder?: "asc" | "desc";
  sortBy: keyof AccountListData;
};

export type ModalType = "create" | "update" | "detail" | null;

const useAccountController = () => {
  const tableRef = useRef<DataTableRef>(null);
  const [accountList, setAccountList] = useState<AccountListData[]>(data);
  const [modalType, setModalType] = useState<ModalType>();

  const [filter, setFilter] = useState<AccountFilter>({
    page: 1,
    pageSize: 5,
    sortOrder: "asc",
    sortBy: "id",
  });

  const totalRecords = useMemo(() => accountList.length, [accountList]);

  const accountListData: AccountListData[] = useMemo(() => {
    const { page, pageSize, sortOrder, sortBy } = filter;

    let _accountList = sortByField([...accountList], sortBy, sortOrder);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    _accountList = _accountList.slice(startIndex, endIndex);

    return _accountList;
  }, [accountList, filter]);

  const createAccount = (account: AccountListData) => {
    const _accountList = [...accountList];

    const newAccount = {
      ...account,
      id: _accountList.length + 1,
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

  const handleModalTypeChange = (type: ModalType) => {
    setModalType(type);
  };

  return {
    filter,
    tableRef,
    modalType,
    totalRecords,
    accountListData,

    createAccount,
    updateAccount,

    handleFilterChange,
    handleModalTypeChange,
  };
};

export default useAccountController;
