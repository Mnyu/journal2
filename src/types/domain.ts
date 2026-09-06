export type DistributionPoint = {
  returnPercent: number;
  numberOfTrades: number;
};

export type MonthEdgeWinRate = {
  month: string;
  edge: number;
  winRate: number;
};

export type YearDistribution = {
  returnPercent: number;
  year: number;
  numberOfTrades: number;
};

export type Trajectory = {
  period: string;
  noOfTrades: number;
  wins: number;
  losses: number;
  avgGain: number;
  avgLoss: number;
  winRate: number;
  riskReward: number;
  edge: number;
};

export interface AuthenticatedAPIUser {
  userId: string;
  apiKeyId: string;
  permissions?: { [key: string]: string[] } | null | undefined;
}
