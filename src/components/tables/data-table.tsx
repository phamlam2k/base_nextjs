/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  RowSelectionState,
  TableState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Pagination from "@/components/ui/pagination";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface TableState {
    pagination: {
      pageIndex: number;
      pageSize: number;
      totalPages?: number;
      handleChangePagination?: (
        params: Omit<TableState["pagination"], "handleChangePagination">
      ) => void;
    };
  }
}

export interface DataTableProps<TData> {
  columns: ColumnDef<any>[];
  data: TData[];
  state?: Partial<TableState>;
  title?: string;
  checkedId?: keyof TData;

  onChange?: OnChangeFn<RowSelectionState>;
  onDeleteSelected?: (ids: string[]) => void;
}

export interface DataTableRef {
  getSelectedRowIds: () => string[];
}

function DataTable<TData>(
  props: DataTableProps<TData>,
  ref: React.ForwardedRef<DataTableRef>
) {
  const {
    data,
    title = "Table List",
    state,
    columns,
    checkedId,

    onChange,
    onDeleteSelected,
  } = props;

  const table = useReactTable({
    data,
    columns,
    state,
    onRowSelectionChange: onChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    enableRowSelection: true,
  });

  const selectedRowIds = React.useMemo(
    () =>
      checkedId
        ? table
            .getSelectedRowModel()
            .flatRows.map((row) => row.original[checkedId])
        : [],
    [table, checkedId]
  ) as string[];

  React.useImperativeHandle(ref, () => ({
    getSelectedRowIds: () => selectedRowIds,
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>
        <div>
          {selectedRowIds.length > 0 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDeleteSelected?.(selectedRowIds)}
              className="flex gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination
          limit={table.getState().pagination.pageSize}
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getState().pagination.totalPages || 1}
          handleChangePagination={(params) =>
            table.getState().pagination.handleChangePagination?.(params)
          }
        />
      </CardContent>
    </Card>
  );
}

DataTable.displayName = "DataTable";

export default React.forwardRef(DataTable);
