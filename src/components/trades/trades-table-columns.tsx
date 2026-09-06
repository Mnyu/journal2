import { formatAmountInInr } from '@/lib/amounts';
import { TradeDTO } from '@/types/dto';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export const tradeColumnsMap = {
  symbol: {
    id: 'symbol',
    accessorKey: 'symbol',
    header: 'Symbol',
    // header: ({ column }) => (
    //   <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='pl-0'>
    //     Symbol
    //     <ChevronsUpDown className='ml-2 h-4 w-4' />
    //   </Button>
    // ),
  },
  strategy: {
    id: 'strategy',
    accessorKey: 'strategy',
    header: 'Strategy',
  },
  entry: {
    id: 'entry',
    accessorKey: 'entry',
    header: 'Entry',
    cell: ({ row }) => formatAmountInInr(row.getValue('entry')),
  },
  quantity: {
    id: 'quantity',
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  risk: {
    id: 'risk',
    accessorKey: 'risk',
    header: 'Risk',
    cell: ({ row }) => formatAmountInInr(row.getValue('risk')),
  },
  exit: {
    id: 'exit',
    accessorKey: 'exit',
    header: 'Exit',
    cell: ({ row }) => formatAmountInInr(row.getValue('exit')),
  },
  entryDate: {
    id: 'entryDate',
    accessorKey: 'entryDate',
    header: 'Entry Date',
  },
  exitDate: {
    id: 'exitDate',
    accessorKey: 'exitDate',
    header: 'Exit Date',
  },
  return: {
    id: 'return',
    accessorKey: 'return',
    header: 'Return',
    cell: ({ row }) => {
      const value = row.getValue('return') as number;
      if (value == null) {
        return <></>;
      }
      const formattedAmt = formatAmountInInr(row.getValue('return'));
      let className = '';
      if (value < 0) {
        className = 'text-[var(--red)]';
      } else if (value > 0) {
        className = 'text-[var(--green)]';
      }
      return <span className={className}>{formattedAmt}</span>;
    },
  },
  returnPercent: {
    id: 'returnPercent',
    accessorKey: 'returnPercent',
    header: 'Return %',
    cell: ({ row }) => {
      const value = row.getValue('returnPercent') as number;
      if (value == null) {
        return <></>;
      }
      let className = '';
      if (value < 0) {
        className = 'text-[var(--red)]';
      } else if (value > 0) {
        className = 'text-[var(--green)]';
      }
      return <span className={className}>{value}%</span>;
    },
  },
  rMultiple: {
    id: 'rMultiple',
    accessorKey: 'rMultiple',
    header: 'R',
    cell: ({ row }) => {
      const value = row.getValue('rMultiple') as number;
      if (value == null) {
        return <></>;
      }
      let className = '';
      if (value < 0) {
        className = 'text-[var(--red)]';
      } else if (value > 0) {
        className = 'text-[var(--green)]';
      }
      return <span className={className}>{value}R</span>;
    },
  },
  review: {
    id: 'review',
    header: 'Review',
    cell: ({ row }) => {
      const trade = row.original;
      return (
        <Link href={`/trades/${trade.id}`}>
          <Pencil size={16} />
        </Link>
      );
    },
  },
} satisfies Record<string, ColumnDef<TradeDTO>>;
