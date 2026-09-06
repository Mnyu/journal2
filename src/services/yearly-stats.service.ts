import * as yearlyStatsRepo from '@/repositories/yearly-stats.repository';
import { YearDistribution } from '@/types/domain';
import { AnalyticsTO, YearDistributionDTO } from '@/types/dto';

export const getCurrentAnalytics = async (): Promise<AnalyticsTO> => {
  const monthEdgeWinRates = await yearlyStatsRepo.getLast12MonthsEdgeAndWinRate();

  const currentEdge = monthEdgeWinRates.length > 0 ? monthEdgeWinRates[0].edge : 0;
  let sumOfMonthlyEdges = 0;
  let bestEdge = 0;
  let bestEdgeMonth = '';
  let worstEdge = Number.MAX_SAFE_INTEGER;
  let worstEdgeMonth = '';
  let monthsWithEdgeMoreThan2 = 0;
  const winRates = [];
  const edges = [];

  for (const monthEdgeWinRate of monthEdgeWinRates) {
    sumOfMonthlyEdges = sumOfMonthlyEdges + monthEdgeWinRate.edge;
    if (monthEdgeWinRate.edge > bestEdge) {
      bestEdge = monthEdgeWinRate.edge;
      bestEdgeMonth = monthEdgeWinRate.month;
    }
    if (monthEdgeWinRate.edge < worstEdge) {
      worstEdge = monthEdgeWinRate.edge;
      worstEdgeMonth = monthEdgeWinRate.month;
    }
    if (monthEdgeWinRate.edge >= 2) {
      monthsWithEdgeMoreThan2++;
    }
    winRates.push({ month: monthEdgeWinRate.month, winRate: monthEdgeWinRate.winRate });
    edges.push({ month: monthEdgeWinRate.month, edge: monthEdgeWinRate.edge });
  }
  if (worstEdge === Number.MAX_SAFE_INTEGER) {
    worstEdge = 0;
    worstEdgeMonth = '';
  }
  const avgEdge =
    monthEdgeWinRates.length > 0 ? Math.round((sumOfMonthlyEdges / monthEdgeWinRates.length) * 100) / 100 : 0;

  const last3YearsDistributions = await yearlyStatsRepo.getLast3YearsDistribution();

  return {
    currentEdge: currentEdge,
    avgEdge: avgEdge,
    bestEdge: bestEdge,
    bestEdgeMonth: bestEdgeMonth,
    worstEdge: worstEdge,
    worstEdgeMonth: worstEdgeMonth,
    monthsWithEdgeMoreThan2: monthsWithEdgeMoreThan2,
    edges: edges,
    winRates: winRates,
    last3YearsDistributions: buildYearDistributionDTOs(last3YearsDistributions),
  };
};

const buildYearDistributionDTOs = (yearDistributions: YearDistribution[]): YearDistributionDTO[] => {
  return yearDistributions.map((dist) => ({
    returnPercent: dist.returnPercent,
    year: dist.year,
    numberOfTrades: dist.numberOfTrades,
  }));
};
