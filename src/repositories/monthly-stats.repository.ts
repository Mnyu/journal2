import { db } from '@/db/client';
import { MonthlyStat, monthlyStatsTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { monthlyDistributionForCurrentMonthSql, monthlyStatForCurrentMonthSql } from './native-queries';
import { executeNativeSqlFirstResult } from './utils.repository';
import { DistributionPoint } from '@/types/domain';
import { requireSession } from '@/lib/auth-session';

export const getMonthlyStat = async (yearMonth: string): Promise<MonthlyStat | null> => {
  const { user } = await requireSession();
  const [monthStat] = await db
    .select()
    .from(monthlyStatsTable)
    .where(and(eq(monthlyStatsTable.userId, user.id), eq(monthlyStatsTable.yearMonth, yearMonth)));
  return monthStat ?? null;
};

export const getMonthlyStatForCurrentMonth = async (): Promise<MonthlyStat | null> => {
  const { user } = await requireSession();
  const dbStat = await executeNativeSqlFirstResult(monthlyStatForCurrentMonthSql, user.id);
  if (!dbStat) {
    return null;
  }

  let distribution: DistributionPoint[] = [];
  const dbDistribution = await executeNativeSqlFirstResult(monthlyDistributionForCurrentMonthSql, user.id);
  if (dbDistribution) {
    distribution = dbDistribution.distribution as DistributionPoint[];
  }

  const monthlyStat: MonthlyStat = {
    userId: dbStat.user_id as string,
    yearMonth: dbStat.year_month as string,
    month: dbStat.year_month as string,
    trades: Number(dbStat.trades),
    wins: Number(dbStat.wins),
    losses: Number(dbStat.losses),
    avgGain: Number(dbStat.avg_gain),
    avgLoss: Number(dbStat.avg_loss),
    winRate: Number(dbStat.win_rate),
    riskReward: Number(dbStat.risk_reward),
    edge: Number(dbStat.edge),
    distribution: distribution,
  };
  return monthlyStat;
};
