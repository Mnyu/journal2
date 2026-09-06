import DashboardBellCurve from '@/components/dashboard/dashboard-bell-curve';
import DashBoardHeader from '@/components/dashboard/dashboard-header';
import DashboardKPIs from '@/components/dashboard/dashboard-kpis';
import OpenTrades from '@/components/dashboard/dashboard-open-trades';
import Trajectory from '@/components/trajectory-table';
import { getCurrentMonth } from '@/lib/months';
import { TradeListFilters } from '@/schemas/trade.schema';
import { getMonthlyStat, getMonthlyStatForCurrentMonth } from '@/services/monthly-stats.service';
import { getOpenTrades } from '@/services/trade.service';

interface DashboardProps {
  searchParams: Promise<{
    month?: string;
  }>;
}

const Dashboard = async ({ searchParams }: DashboardProps) => {
  const { month } = await searchParams;
  const currentMonth = getCurrentMonth();
  const payload: TradeListFilters = { page: 1, pageSize: 4, sort: 'createdAt', direction: 'desc' };

  const statPromise = month && month !== currentMonth ? getMonthlyStat(month) : getMonthlyStatForCurrentMonth();
  const openTradesPromise = await getOpenTrades(payload);

  const [stat, openTradesData] = await Promise.all([statPromise, openTradesPromise]);

  return (
    <section className='w-full flex flex-col gap-4 p-1 overflow-auto focus-visible:outline-none'>
      <DashBoardHeader selectedMonth={month} />
      <DashboardKPIs stat={stat} />
      <section className='h-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-1'>
        <OpenTrades data={openTradesData} />
        <Trajectory pagination={true} />
      </section>
      <DashboardBellCurve distribution={stat.distribution} />
    </section>
  );
};

export default Dashboard;
