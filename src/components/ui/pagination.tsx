"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TableState } from "@tanstack/react-table";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
  handleChangePagination?: (
    param: Omit<TableState["pagination"], "handleChangePagination">
  ) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  limit,
  totalPages,
  currentPage,

  handleChangePagination,
}) => {
  const callBack = handleChangePagination
    ? handleChangePagination
    : (param: Omit<TableState["pagination"], "handleChangePagination">) => {
        console.warn("handleChangePagination not provided", param);
      };

  const pageNumber = useMemo(
    () => new Array(totalPages).fill(0).map((_, index) => index + 1),
    [totalPages]
  );

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
      <div className="flex items-center gap-1 text-sm">
        <span>Rows per page:</span>
        <Select
          value={limit.toString()}
          onValueChange={(val) =>
            callBack({
              pageIndex: currentPage - 1,
              pageSize: parseInt(val, 10),
            })
          }
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50, 100].map((l) => (
              <SelectItem key={l} value={l.toString()}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            callBack({
              pageIndex: currentPage - 2 < 0 ? 0 : currentPage - 2,
              pageSize: limit,
            })
          }
          disabled={currentPage === 1}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        {pageNumber.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() =>
              callBack({
                pageIndex: page - 1,
                pageSize: limit,
              })
            }
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            callBack({
              pageIndex:
                currentPage < totalPages - 1 ? currentPage : totalPages - 1,
              pageSize: limit,
            })
          }
          disabled={currentPage === totalPages}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
