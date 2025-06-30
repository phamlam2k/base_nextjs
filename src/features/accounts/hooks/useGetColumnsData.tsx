import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { AccountListData } from "../models/data";

const useGetColumnsData = () => {
  const columns = useMemo<ColumnDef<AccountListData>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ],
    []
  );

  return columns;
};

export default useGetColumnsData;
