// ***************** GENERIC - START ***********************
export type Pagination = {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export interface PageResponse<T> {
  data: T[];
  pagination: Pagination;
}
// ***************** GENERIC - END *************************

// ***************** SPECIFIC - START **********************
export type DistributionPointDTO = {
  returnPercent: number;
  numberOfTrades: number;
};

export type MonthlyStatDTO = {
  yearMonth: string;
  month: string;
  trades: number;
  wins: number;
  losses: number;
  avgGain: number;
  avgLoss: number;
  winRate: number;
  riskReward: number;
  edge: number;
  distribution: DistributionPointDTO[];
};

export type TradeDTO = {
  id: string;
  orderId: string;
  symbol: string;
  strategy: string;
  entry: number;
  quantity: number;
  risk: number;
  exit: number | null;
  entryDate: string;
  exitDate: string;
  return: number | null;
  returnPercent: number | null;
  rMultiple: number | null;
  reviews: TradeReviewsDTO | null;
};

export type CreateTradeDTO = {
  orderId: string;
  symbol: string;
  strategy: string;
  entry: number;
  quantity: number;
  risk: number;
  entryDate: string;
  exit?: number;
  exitDate?: string;
};

export type TradeReviewsDTO = {
  tradeId: string;
  entry: TradeReviewDTO | null;
  exit: TradeReviewDTO | null;
};

export type TradeReviewDTO = {
  id?: string;
  type: string;
  score: number;
  comments: string;
  aiInsights?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type YearDistributionDTO = {
  returnPercent: number;
  year: number;
  numberOfTrades: number;
};

export type MonthlyEdgeDTO = {
  month: string;
  edge: number;
};

export type MonthlyWinRateDTO = {
  month: string;
  winRate: number;
};

export type AnalyticsTO = {
  currentEdge: number;
  avgEdge: number;
  bestEdge: number;
  bestEdgeMonth: string;
  worstEdge: number;
  worstEdgeMonth: string;
  monthsWithEdgeMoreThan2: number;
  winRates: MonthlyWinRateDTO[];
  edges: MonthlyEdgeDTO[];
  last3YearsDistributions: YearDistributionDTO[];
};

export type TrajectoryDTO = {
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

export type APIKeyDTO = {
  id: string;
  name: string | null;
  status: string;
  created: string;
  expires: string;
  lastUsed: string;
};

// ***************** SPECIFIC - END ************************
