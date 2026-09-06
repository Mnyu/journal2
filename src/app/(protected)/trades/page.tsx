import TradesHeader from '@/components/trades/trades-header';
import TradesTable from '@/components/trades/trades-table';
import { TradeListFilters } from '@/schemas/trade.schema';
import { getTrades } from '@/services/trade.service';

interface TradesProps {
  searchParams: Promise<TradeListFilters>;
}

const Trades = async ({ searchParams }: TradesProps) => {
  const params = await searchParams;
  const data = await getTrades(params);

  return (
    <section className='flex flex-col w-full h-full gap-5'>
      <TradesHeader />
      <TradesTable data={data} />
    </section>
  );
};
export default Trades;
