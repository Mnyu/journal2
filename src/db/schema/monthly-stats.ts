import { DistributionPoint } from '@/types/domain';
import { integer, jsonb, numeric, pgTable, primaryKey, text, varchar } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const monthlyStatsTable = pgTable(
  'monthly_stats',
  {
    userId: text('user_id')
      .references(() => user.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    yearMonth: varchar('year_month', { length: 7 }).notNull(),
    month: varchar('month', { length: 20 }).notNull().unique(),
    trades: integer('trades').notNull(),
    wins: integer('wins').notNull(),
    losses: integer('losses').notNull(),
    avgGain: numeric('avg_gain', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }).notNull(),
    avgLoss: numeric('avg_loss', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }).notNull(),
    winRate: numeric('win_rate', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }).notNull(),
    riskReward: numeric('risk_reward', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }).notNull(),
    edge: numeric('edge', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }).notNull(),
    distribution: jsonb('distribution').$type<DistributionPoint[]>().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.yearMonth] })],
);

export type MonthlyStat = typeof monthlyStatsTable.$inferSelect;
export type NewMonthlyStat = typeof monthlyStatsTable.$inferInsert;
