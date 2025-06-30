"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  RowSelectionState,
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
import { Pagination } from "@/components/ui/pagination";

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  value?: RowSelectionState;
  onChange?: OnChangeFn<RowSelectionState>;
  title?: string;
  helperText?: string;
  checkedId?: keyof TData;
  onDeleteSelected?: (ids: TData[keyof TData][]) => void;
}

export interface DataTableRef<TData> {
  getSelectedRowIds: () => TData[keyof TData][];
}

function DataTable<TData>(
  props: DataTableProps<TData>,
  ref: React.ForwardedRef<DataTableRef<TData>>
) {
  const {
    columns,
    data,
    value,
    onChange,
    title = "Table List",
    helperText,
    onDeleteSelected,
    checkedId,
  } = props;

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: value ?? {},
    },
    onRowSelectionChange: onChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
  );

  React.useImperativeHandle(ref, () => ({
    getSelectedRowIds: () => selectedRowIds,
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>
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

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Pagination
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPageChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
        {helperText && (
          <div className="text-xs text-destructive mt-1">{helperText}</div>
        )}
      </CardContent>
    </Card>
  );
}

DataTable.displayName = "DataTable";

export default React.forwardRef(DataTable);
