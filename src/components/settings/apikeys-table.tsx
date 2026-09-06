'use client';

import { APIKeyDTO } from '@/types/dto';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../table/data-table';
import DeleteAPIKey from './apikeys-delete';

interface APIKeysTableProps {
  keys: APIKeyDTO[];
  total: number;
  limit: number | undefined;
  offset: number | undefined;
}

const APIKeysTable = ({ keys, total, limit, offset }: APIKeysTableProps) => {
  const apiKeyColumnsMap = {
    name: {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
    },
    status: {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
    },
    created: {
      id: 'created',
      accessorKey: 'created',
      header: 'Created',
    },
    expires: {
      id: 'expires',
      accessorKey: 'expires',
      header: 'Expires',
    },
    lastUsed: {
      id: 'lastUsed',
      accessorKey: 'lastUsed',
      header: 'Last Used',
    },
    actions: {
      id: 'actions',
      header: 'Delete',
      cell: ({ row }) => {
        const apiKey = row.original;
        return <DeleteAPIKey id={apiKey.id} />;
      },
    },
  } satisfies Record<string, ColumnDef<APIKeyDTO>>;

  const columns = [
    apiKeyColumnsMap.name,
    apiKeyColumnsMap.status,
    apiKeyColumnsMap.created,
    apiKeyColumnsMap.expires,
    apiKeyColumnsMap.lastUsed,
    apiKeyColumnsMap.actions,
  ];
  const pageSize = limit ?? total;
  const page = limit ? Math.floor((offset ?? 0) / limit) + 1 : 1;
  const totalPages = limit ? Math.ceil(total / limit) : 1;
  const totalRecords = total;
  return (
    <DataTable
      columns={columns}
      data={keys}
      pagination={false}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      totalRecords={totalRecords}
    />
  );
};
export default APIKeysTable;
