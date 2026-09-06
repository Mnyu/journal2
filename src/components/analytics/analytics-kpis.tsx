import { AnalyticsTO } from '@/types/dto';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface AnalyticsKPIsProps {
  analytics: AnalyticsTO;
}

const AnalyticsKPIs = ({ analytics }: AnalyticsKPIsProps) => {
  return (
    <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-1'>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Current Edge</CardDescription>
          <CardTitle className='text-2xl xl:text-3xl text-[var(--green)]'>{analytics.currentEdge}</CardTitle>
          <CardDescription>MTD</CardDescription>
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Avg Edge</CardDescription>
          <CardTitle
            className={`text-2xl xl:text-3xl ${analytics.avgEdge >= 2 ? 'text-[var(--green)]' : 'text-[var(--red)]'}`}
          >
            {analytics.avgEdge}
          </CardTitle>
          <CardDescription>Last 12 months</CardDescription>
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Best Monthly Edge</CardDescription>
          <CardTitle className='text-2xl xl:text-3xl text-[var(--green)]'>{analytics.bestEdge}</CardTitle>
          <CardDescription>{analytics.bestEdgeMonth}</CardDescription>
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Worst Monthly Edge</CardDescription>
          <CardTitle className='text-2xl xl:text-3xl text-[var(--red)]'>{analytics.worstEdge}</CardTitle>
          <CardDescription>{analytics.worstEdgeMonth}</CardDescription>
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>Months with Edge &ge; 2</CardDescription>
          <CardTitle className='text-2xl xl:text-3xl'>{analytics.monthsWithEdgeMoreThan2}</CardTitle>
          <CardDescription>Last 12 months</CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
};
export default AnalyticsKPIs;
