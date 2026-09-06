import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MonthlyStatDTO } from '@/types/dto';

interface DashboardKPIsProps {
  stat: MonthlyStatDTO;
}

const DashboardKPIs = ({ stat }: DashboardKPIsProps) => {
  const trend = stat.edge >= 2 ? 'Upward' : 'Downward';
  const edgeClass = stat.edge >= 2 ? 'text-[var(--green)]' : 'text-[var(--red)]';
  return (
    <section className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-1'>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Trend</CardDescription>
          <CardTitle className={`text-2xl xl:text-3xl ${edgeClass}`}>{trend}</CardTitle>
          {/* <CardTitle className='flex gap-5 items-center'>
            <span className='text-2xl xl:text-3xl'>Upward</span>
            <TrendingUp size={24} />
          </CardTitle> */}
          {/* <CardDescription>System operation is efficient</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Trades</CardDescription>
          <CardTitle className='text-2xl xl:text-3xl'>{stat.trades}</CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Win %</CardDescription>
          <CardTitle className='text-2xl xl:text-3xl text-[var(--green)]'>{stat.winRate}%</CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Risk : Reward</CardDescription>
          <CardTitle className='text-2xl xl:text-3xl text-[var(--green)]'>{stat.riskReward}x</CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Edge</CardDescription>
          <CardTitle className={`text-2xl xl:text-3xl ${edgeClass}`}>{stat.edge}</CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Average Gain</CardDescription>
          <CardTitle className='text-2xl xl:text-3xl text-[var(--green)]'>₹{stat.avgGain}</CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Average Loss</CardDescription>
          <CardTitle className='text-2xl xl:text-3xl text-[var(--red)]'>₹{stat.avgLoss}</CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
    </section>
  );
};
export default DashboardKPIs;
