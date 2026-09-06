import { TradeDTO } from '@/types/dto';
import DescriptionItem from '../description-item';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatAmountInInr } from '@/lib/amounts';

interface TradeDetailsProps {
  trade: TradeDTO;
}

const TradeDetails = ({ trade }: TradeDetailsProps) => {
  let returnClass = '';
  if (trade.return && trade.return > 0) {
    returnClass = 'text-[var(--green)]';
  } else if (trade.return && trade.return < 0) {
    returnClass = 'text-[var(--red)]';
  }
  return (
    <section>
      <Card className='w-full h-full'>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          <DescriptionItem label='Symbol' value={trade.symbol} />
          <DescriptionItem label='Entry' value={formatAmountInInr(trade.entry)} />
          <DescriptionItem label='Quantity' value={trade.quantity} />
          <DescriptionItem label='Risk' value={formatAmountInInr(trade.risk)} />
          <DescriptionItem label='Order Id' value={trade.orderId} />
          <DescriptionItem label='Exit' value={trade.exit ? formatAmountInInr(trade.exit) : ''} />
          <DescriptionItem label='Entry Date' value={trade.entryDate} />
          <DescriptionItem label='Exit Date' value={trade.exitDate} />
          <DescriptionItem label='Strategy' value={trade.strategy} />
          <DescriptionItem
            label='Return'
            value={<span className={returnClass}>{trade.return != null ? formatAmountInInr(trade.return) : ''}</span>}
          />
          <DescriptionItem
            label='Return %'
            value={<span className={returnClass}>{trade.returnPercent != null ? trade.returnPercent + '%' : ''}</span>}
          />
          <DescriptionItem
            label='R'
            value={<span className={returnClass}>{trade.rMultiple != null ? trade.rMultiple + 'R' : ''}</span>}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default TradeDetails;
