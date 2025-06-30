"use client";

import DataTable from "@/components/tables/data-table";
import useAccountController from "../controllers/account.controller";
import useGetColumnsData from "../hooks/useGetColumnsData";

const AccountView = () => {
  const { tableRef, filter, accountListData } = useAccountController();
  const columns = useGetColumnsData();

  return (
    <div>
      <DataTable
        ref={tableRef}
        state={{
          pagination: {
            pageIndex: filter.page,
            pageSize: filter.pageSize,
            totalCount: accountListData.length,
          },
        }}
        columns={columns}
        data={accountListData}
      />
    </div>
  );
};

export default AccountView;
