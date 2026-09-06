import { saveReviews } from '@/actions/trade.actions';
import TradeDetails from '@/components/trade/trade-details';
import TradeGrades from '@/components/trade/trade-grades';
import TradeHeader from '@/components/trade/trade-header';
import { getTradeById } from '@/services/trade.service';

type TradeProps = {
  params: Promise<{
    id: string;
  }>;
};

const Trade = async ({ params }: TradeProps) => {
  const { id } = await params;
  const trade = await getTradeById(id);
  return (
    <section className='w-full h-full flex flex-col gap-4 p-1 overflow-auto focus-visible:outline-none'>
      <TradeHeader />
      <TradeDetails trade={trade} />
      <TradeGrades tradeId={trade.id} reviews={trade.reviews} saveReviews={saveReviews} />
    </section>
  );
};
export default Trade;
