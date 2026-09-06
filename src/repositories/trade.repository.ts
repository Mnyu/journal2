import { db } from '@/db/client';
import { NewTrade, Trade, tradeReviews, trades } from '@/db/schema';
import { TradeListFilters } from '@/schemas/trade.schema';
import { Trajectory } from '@/types/domain';
import { and, asc, desc, eq, isNull, sql } from 'drizzle-orm';
import { trajectorySql } from './native-queries';
import { executeNativeSql } from './utils.repository';
import { requireSession } from '@/lib/auth-session';

export const findTrades = async (filters: TradeListFilters) => {
  const { user } = await requireSession();
  const conditions = [eq(trades.userId, user.id)];
  if (filters.symbol) {
    conditions.push(eq(trades.symbol, filters.symbol));
  }
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
  const offset = (filters.page - 1) * filters.pageSize;

  const [rows, countResult] = await Promise.all([
    db
      .select()
      .from(trades)
      .where(whereClause)
      .orderBy(desc(trades.createdAt), asc(trades.symbol), asc(trades.id))
      .limit(filters.pageSize)
      .offset(offset),

    db
      .select({
        total: sql<number>`count(*)`,
      })
      .from(trades)
      .where(whereClause),
  ]);

  return {
    rows,
    total: Number(countResult[0]?.total ?? 0),
  };
};

export const findOpenTrades = async (filters: TradeListFilters) => {
  const { user } = await requireSession();
  const conditions = [eq(trades.userId, user.id), isNull(trades.exitDate)];
  const whereClause = and(...conditions);
  const offset = (filters.page - 1) * filters.pageSize;
  const [rows, countResult] = await Promise.all([
    db
      .select()
      .from(trades)
      .where(whereClause)
      .orderBy(desc(trades.createdAt), asc(trades.symbol), asc(trades.id))
      .limit(filters.pageSize)
      .offset(offset),

    db
      .select({
        total: sql<number>`count(*)`,
      })
      .from(trades)
      .where(whereClause),
  ]);

  return {
    rows,
    total: Number(countResult[0]?.total ?? 0),
  };
};

export const findTrade = async (id: string) => {
  const { user } = await requireSession();
  const conditions = [eq(trades.userId, user.id), eq(trades.id, id)];
  const whereClause = and(...conditions);
  const trade = await db.query.trades.findFirst({
    where: whereClause,
    with: {
      reviews: {
        orderBy: [desc(tradeReviews.createdAt)],
      },
    },
  });
  return trade ?? null;
};

export const findTrajectory = async (): Promise<Trajectory[]> => {
  const { user } = await requireSession();
  const dbRows = await executeNativeSql(trajectorySql, user.id);
  return dbRows.map((dbRow) => ({
    period: dbRow.period as string,
    noOfTrades: Number(dbRow.trades),
    wins: Number(dbRow.wins),
    losses: Number(dbRow.losses),
    avgGain: Number(dbRow.avg_gain),
    avgLoss: Number(dbRow.avg_loss),
    winRate: Number(dbRow.win_rate),
    riskReward: Number(dbRow.risk_reward),
    edge: Number(dbRow.edge),
  }));
};

export const createTrades = async (newTrades: NewTrade[]): Promise<Trade[]> => {
  if (newTrades.length === 0) {
    return [];
  }
  return db.transaction(async (tx) => {
    const createdTrades = await tx.insert(trades).values(newTrades).onConflictDoNothing().returning();
    return createdTrades;
  });
};

export type TradeWithReviews = NonNullable<Awaited<ReturnType<typeof findTrade>>>;
