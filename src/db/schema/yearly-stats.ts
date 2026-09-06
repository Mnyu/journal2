import { DistributionPoint } from '@/types/domain';
import { integer, jsonb, numeric, pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const yearlyStats = pgTable(
  'yearly_stats',
  {
    userId: text('user_id')
      .references(() => user.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    year: integer('year').notNull(),
    trades: integer('trades').notNull(),
    wins: integer('wins').notNull(),
    losses: integer('wins').notNull(),
    avgGain: numeric('avg_gain').notNull(),
    avgLoss: numeric('avg_loss').notNull(),
    winRate: numeric('win_rate').notNull(),
    riskReward: numeric('risk_reward').notNull(),
    edge: numeric('risk_reward').notNull(),
    distribution: jsonb('distribution').$type<DistributionPoint[]>().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.year] })],
);

export type YearlyStat = typeof yearlyStats.$inferSelect;
export type NewYearlyStat = typeof yearlyStats.$inferInsert;
