'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../data-table';

interface RHFDataTableProps<TData extends { id: string }, TValue> {
  name: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  helperText?: string;
}

export function RHFDataTable<TData extends { id: string }, TValue>({
  name,
  columns,
  data,
  title,
  helperText,
}: RHFDataTableProps<TData, TValue>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={{}}
      render={({ field, fieldState }) => (
        <DataTable
          columns={columns}
          data={data}
          value={field.value}
          onChange={(updaterOrValue) => {
            if (typeof updaterOrValue === 'function') {
              field.onChange(updaterOrValue(field.value));
            } else {
              field.onChange(updaterOrValue);
            }
          }}
          title={title}
          helperText={fieldState.error?.message ?? helperText}
        />
      )}
    />
  );
}
