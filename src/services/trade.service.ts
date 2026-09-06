import { NewTrade, Trade, TradeReview } from '@/db/schema';
import { NotFoundError, ValidationError } from '@/lib/errors';
import { buildPagination } from '@/lib/pagination';
import * as reviewRepo from '@/repositories/trade-review.repository';
import * as repo from '@/repositories/trade.repository';
import { TradeReviews } from '@/schemas/trade-review.schema';
import { TradeListFilters, tradeListFiltersSchema } from '@/schemas/trade.schema';
import { Trajectory } from '@/types/domain';
import { CreateTradeDTO, PageResponse, TradeDTO, TradeReviewDTO, TradeReviewsDTO, TrajectoryDTO } from '@/types/dto';
import { flattenError, symbol } from 'zod';

export const getTrades = async (filters: TradeListFilters): Promise<PageResponse<TradeDTO>> => {
  const parsed = tradeListFiltersSchema.safeParse(filters);
  if (!parsed.success) {
    throw new ValidationError('Input validation failed', flattenError(parsed.error).fieldErrors);
  }
  filters = parsed.data;
  const queryResult = await repo.findTrades(filters);
  const pagination = buildPagination(filters.page, filters.pageSize, queryResult.total);
  return {
    data: buildDTOsFromTrades(queryResult.rows),
    pagination: pagination,
  };
};

export const getOpenTrades = async (filters: TradeListFilters): Promise<PageResponse<TradeDTO>> => {
  const parsed = tradeListFiltersSchema.safeParse(filters);
  if (!parsed.success) {
    throw new ValidationError('Input validation failed', flattenError(parsed.error).fieldErrors);
  }
  filters = parsed.data;
  const queryResult = await repo.findOpenTrades(filters);
  const pagination = buildPagination(filters.page, filters.pageSize, queryResult.total);
  return {
    data: buildDTOsFromTrades(queryResult.rows),
    pagination: pagination,
  };
};

export const getTradeById = async (id: string): Promise<TradeDTO> => {
  const trade = await repo.findTrade(id);
  if (!trade) {
    throw new NotFoundError('Trade not found');
  }
  return buildDTOFromTradeWithReviews(trade);
};

export const getTrajectory = async (): Promise<TrajectoryDTO[]> => {
  const trajectories = await repo.findTrajectory();
  return trajectories.map((t) => buildDTOFromTrajectory(t));
};

export const saveReviews = async (reviews: TradeReviews): Promise<TradeReviewsDTO> => {
  const tradeId = reviews.tradeId;
  getTradeById(tradeId);

  let entryReviewDTO = null;
  let exitReviewDTO = null;
  if (reviews.entry) {
    const entryReview = await reviewRepo.upsertTradeReview({
      type: 'ENTRY',
      tradeId: tradeId,
      score: reviews.entry.score,
      comments: reviews.entry.comments,
    });
    entryReviewDTO = buildDTOFromReview(entryReview);
  }
  if (reviews.exit) {
    const exitReview = await reviewRepo.upsertTradeReview({
      type: 'EXIT',
      tradeId: tradeId,
      score: reviews.exit.score,
      comments: reviews.exit.comments,
    });
    exitReviewDTO = buildDTOFromReview(exitReview);
  }
  return {
    tradeId: tradeId,
    entry: entryReviewDTO,
    exit: exitReviewDTO,
  };
};

export const saveTrades = async (userId: string, newTradeDTOs: CreateTradeDTO[]) => {
  const newTrades = buildTradesFromCreateTradeDTOs(userId, newTradeDTOs);
  const createdTrades = await repo.createTrades(newTrades);
  return buildDTOsFromTrades(createdTrades);
};

const buildDTOsFromTrades = (trades: Trade[]): TradeDTO[] => {
  return trades.map((t) => buildDTOFromTrade(t));
};

const buildDTOFromTrade = (trade: Trade): TradeDTO => {
  return {
    id: trade.id,
    orderId: trade.orderId,
    symbol: trade.symbol,
    strategy: trade.strategy ?? '',
    entry: trade.entry,
    quantity: trade.quantity,
    risk: trade.risk,
    exit: trade.exit ?? null,
    entryDate: trade.entryDate,
    exitDate: trade.exitDate ? trade.exitDate : '',
    return: trade.return ?? null,
    returnPercent: trade.returnPercent ?? null,
    rMultiple: trade.rMultiple ?? null,
    reviews: null,
  };
};

const buildDTOFromTradeWithReviews = (trade: repo.TradeWithReviews): TradeDTO => {
  const tradeDTO = buildDTOFromTrade(trade);
  if (trade.reviews) {
    let entryReviewDTO = null;
    let exitReviewDTO = null;
    trade.reviews.map((review) => {
      const reviewDTO = buildDTOFromReview(review);
      if (review.type === 'ENTRY') {
        entryReviewDTO = reviewDTO;
      } else if (review.type === 'EXIT') {
        exitReviewDTO = reviewDTO;
      }
    });
    tradeDTO.reviews = {
      tradeId: trade.id,
      entry: entryReviewDTO,
      exit: exitReviewDTO,
    };
  }
  return tradeDTO;
};

const buildDTOFromTrajectory = (trajectory: Trajectory): TrajectoryDTO => {
  return {
    period: trajectory.period,
    noOfTrades: trajectory.noOfTrades,
    wins: trajectory.wins,
    losses: trajectory.losses,
    avgGain: trajectory.avgGain,
    avgLoss: trajectory.avgLoss,
    winRate: trajectory.winRate,
    riskReward: trajectory.riskReward,
    edge: trajectory.edge,
  };
};

const buildDTOFromReview = (review: TradeReview): TradeReviewDTO => {
  return {
    id: review.id,
    type: review.type,
    score: review.score,
    comments: review.comments ? review.comments : '',
    aiInsights: review.aiInsights ? review.aiInsights : '',
    createdAt: review.createdAt ? review.createdAt.toISOString() : '',
    updatedAt: review.updatedAt ? review.updatedAt.toISOString() : '',
  };
};

const buildTradesFromCreateTradeDTOs = (userId: string, newTrades: CreateTradeDTO[]): NewTrade[] => {
  return newTrades.map((t) => {
    const trade: NewTrade = {
      userId: userId,
      orderId: t.orderId,
      symbol: t.symbol,
      entry: t.entry,
      quantity: t.quantity,
      risk: t.risk,
      entryDate: t.entryDate,
    };
    if (t.exit) {
      trade.exit = t.exit;
    }
    if (t.exitDate) {
      trade.exitDate = t.exitDate;
    }
    return trade;
  });
};
