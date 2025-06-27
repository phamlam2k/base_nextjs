'use client';

import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';

export interface FakeItem {
  id: string;
  name: string;
  status: 'completed' | 'pending' | 'in progress';
}

const columns: ColumnDef<FakeItem>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={
          row.original.status === 'completed'
            ? 'text-green-600'
            : row.original.status === 'pending'
            ? 'text-yellow-600'
            : 'text-blue-600'
        }
      >
        {row.original.status}
      </span>
    ),
  },
];

export const fakeData: FakeItem[] = [
  { id: '1', name: 'Order A', status: 'completed' },
  { id: '2', name: 'Order B', status: 'pending' },
  { id: '3', name: 'Order C', status: 'in progress' },
  { id: '4', name: 'Order D', status: 'completed' },
  { id: '5', name: 'Order E', status: 'pending' },
  { id: '6', name: 'Order F', status: 'completed' },
  { id: '7', name: 'Order G', status: 'in progress' },
  { id: '8', name: 'Order H', status: 'pending' },
  { id: '9', name: 'Order I', status: 'completed' },
  { id: '10', name: 'Order J', status: 'completed' },
];

const MainPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <DataTable
        columns={columns}
        data={fakeData}
        onDeleteSelected={(ids) => console.log('Deleting ids:', ids)}
      />{' '}
    </div>
  );
};

export default MainPage;
