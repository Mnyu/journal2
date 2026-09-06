'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { tradeColumnsMap } from '../trades/trades-table-columns';
import { PageResponse, TradeDTO } from '@/types/dto';
import { DataTable } from '../table/data-table';

interface OpenTradesTableProps {
  data: PageResponse<TradeDTO>;
}

const OpenTradesTable = ({ data }: OpenTradesTableProps) => {
  const columns = [
    tradeColumnsMap.symbol,
    tradeColumnsMap.entry,
    tradeColumnsMap.quantity,
    tradeColumnsMap.risk,
    tradeColumnsMap.entryDate,
  ];
  return (
    <section>
      <Card className='w-full h-full'>
        <CardHeader className='flex items-end justify-between'>
          <div className='flex flex-col gap-1'>
            <CardTitle>Open Positions</CardTitle>
            <CardDescription>Track active positions, risk exposure, and unrealized returns.</CardDescription>
          </div>
          <div className='flex flex-col gap-1'>
            <CardTitle>
              Risk : <span className='text-[var(--red)]'>₹0</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data.data}
            pagination={true}
            page={data.pagination.page}
            pageSize={data.pagination.pageSize}
            totalPages={data.pagination.totalPages}
            totalRecords={data.pagination.totalRecords}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default OpenTradesTable;
