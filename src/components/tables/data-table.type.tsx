import {
  ColumnDef,
  OnChangeFn,
  RowSelectionState,
} from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  value?: RowSelectionState;
  onChange?: OnChangeFn<RowSelectionState>;
  title?: string;
  helperText?: string;
  onDeleteSelected?: (ids: string[]) => void;
}
