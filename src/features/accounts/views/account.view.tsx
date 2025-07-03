"use client";

import DataTable from "@/components/tables/data-table";
import useAccountController from "../controllers/account.controller";
import useGetColumnsData from "../hooks/useGetColumnsData";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import LoadingDialog from "@/components/dialogs/loading-dialog";

const AccountFormDialog = dynamic(
  () => import("../dialogs/account-form.dialog"),
  {
    ssr: false,
    loading: () => <LoadingDialog />,
  }
);

const AccountView = () => {
  const {
    filter,
    tableRef,
    modalType,
    totalRecords,
    accountListData,

    handleFilterChange,
    handleModalTypeChange,
  } = useAccountController();

  const columns = useGetColumnsData();

  const totalPages = useMemo(() => {
    return Math.ceil(totalRecords / filter.pageSize);
  }, [totalRecords, filter.pageSize]);

  return (
    <div>
      <div className="w-full mb-4 flex items-center justify-end">
        <Button onClick={() => handleModalTypeChange("create")}>
          Create Account
        </Button>
      </div>
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

      {modalType && (
        <AccountFormDialog
          type={modalType}
          onClose={() => handleModalTypeChange(null)}
        />
      )}
    </div>
  );
};

export default AccountView;
