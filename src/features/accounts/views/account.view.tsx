"use client";

import DataTable from "@/components/tables/data-table";
import useAccountController from "../controllers/account.controller";
import useGetColumnsData from "../hooks/useGetColumnsData";
import { useMemo } from "react";

const AccountView = () => {
  const {
    tableRef,
    filter,
    totalRecords,
    accountListData,
    handleFilterChange,
  } = useAccountController();
  const columns = useGetColumnsData();

  const totalPages = useMemo(() => {
    return Math.ceil(totalRecords / filter.pageSize);
  }, [totalRecords, filter.pageSize]);

  return (
    <div>
      <div className="w-full mb-4 flex items-center justify-end"></div>
      <DataTable
        ref={tableRef}
        title="Accounts Management"
        state={{
          pagination: {
            pageIndex: filter.page - 1,
            pageSize: filter.pageSize,
            totalPages,
            handleChangePagination: (params) => {
              handleFilterChange({
                ...filter,
                page: params.pageIndex + 1,
                pageSize: params.pageSize,
              });
            },
          },
        }}
        columns={columns}
        data={accountListData}
      />
    </div>
  );
};

export default AccountView;
