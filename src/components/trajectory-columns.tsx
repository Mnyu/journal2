'use client';

import { TrajectoryDTO } from '@/types/dto';
import { ColumnDef } from '@tanstack/react-table';

export const trajectoryColumns: ColumnDef<TrajectoryDTO>[] = [
  {
    accessorKey: 'period',
    header: 'Period',
  },
  {
    accessorKey: 'winRate',
    header: 'Win %',
    cell: ({ row }) => {
      const value = row.getValue('winRate') as number;
      if (value == null) {
        return <></>;
      }
      return <span>{value}%</span>;
    },
  },
  {
    accessorKey: 'riskReward',
    header: 'Risk : Reward',
    cell: ({ row }) => {
      const value = row.getValue('riskReward') as number;
      if (value == null) {
        return <></>;
      }
      return <span>{value} R</span>;
    },
  },
  {
    accessorKey: 'edge',
    header: 'Edge',
  },
];
