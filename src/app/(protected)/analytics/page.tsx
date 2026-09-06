import AnalyticsHeader from '@/components/analytics/analytics-header';
import AnalyticsKPIs from '@/components/analytics/analytics-kpis';
import BellCurveLast3Years from '@/components/analytics/analytics-bell-last-3-years';
import EdgeTrend from '@/components/analytics/analytics-edge-trend';
import AnalyticsWinRate from '@/components/analytics/analytics-win-rate';
import Trajectory from '@/components/trajectory-table';
import { getCurrentAnalytics } from '@/services/yearly-stats.service';

const Analytics = async () => {
  const analytics = await getCurrentAnalytics();
  return (
    <section className='h-full w-full flex flex-col gap-3 p-1 overflow-auto'>
      <AnalyticsHeader />
      <AnalyticsKPIs analytics={analytics} />
      <section className='grid grid-cols-1 lg:grid-cols-3 gap-4 p-1'>
        <AnalyticsWinRate winRates={analytics.winRates} />
        <EdgeTrend edges={analytics.edges} />
        <BellCurveLast3Years last3YearsDistributions={analytics.last3YearsDistributions} />
      </section>
      <section className='h-full'>
        <Trajectory />
      </section>
    </section>
  );
};
export default Analytics;
