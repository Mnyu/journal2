'use client';

import { DataTable } from '../table/data-table';
import { PageResponse, TradeDTO } from '@/types/dto';
import { tradeColumnsMap } from './trades-table-columns';

interface TradesTableProps {
  data: PageResponse<TradeDTO>;
}

const TradesTable = ({ data }: TradesTableProps) => {
  const columns = [
    tradeColumnsMap.symbol,
    tradeColumnsMap.strategy,
    tradeColumnsMap.entry,
    tradeColumnsMap.quantity,
    tradeColumnsMap.risk,
    tradeColumnsMap.exit,
    tradeColumnsMap.entryDate,
    tradeColumnsMap.exitDate,
    tradeColumnsMap.return,
    tradeColumnsMap.returnPercent,
    tradeColumnsMap.rMultiple,
    tradeColumnsMap.review,
  ];
  return (
    <section className='w-full h-full mx-auto'>
      <DataTable
        columns={columns}
        data={data.data}
        pagination={true}
        page={data.pagination.page}
        pageSize={data.pagination.pageSize}
        totalPages={data.pagination.totalPages}
        totalRecords={data.pagination.totalRecords}
      />
    </section>
  );
};
export default TradesTable;
