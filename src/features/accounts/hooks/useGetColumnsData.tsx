import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { AccountListData } from "../models/data";
import { Button } from "@/components/ui/button";

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
      {
        accessorKey: "",
        header: "Actions",
        cell: ({ row }) => {
          const account = row.original;
          return (
            <div className="flex gap-2">
              <Button
                onClick={() => console.log(`Edit ${account.id}`)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Button>
              <Button
                onClick={() => console.log(`Delete ${account.id}`)}
                className="text-red-500 hover:underline"
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  return columns;
};

export default useGetColumnsData;
