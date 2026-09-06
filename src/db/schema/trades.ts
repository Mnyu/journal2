import { relations } from 'drizzle-orm';
import { date, index, integer, numeric, pgTable, text, timestamp, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import { tradeReviews } from './trade-reviews';
import { tradeTags } from './trade-tags';
import { user } from './auth-schema';

export const trades = pgTable(
  'trades',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .references(() => user.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    orderId: varchar('order_id', { length: 100 }).notNull(),
    symbol: varchar('symbol', { length: 20 }).notNull(),
    strategy: varchar('strategy', { length: 255 }),
    entry: numeric('entry', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }).notNull(),
    quantity: integer('quantity').notNull(),
    risk: numeric('risk', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }).notNull(),
    exit: numeric('exit', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }),
    entryDate: date('entry_date').notNull(),
    exitDate: date('exit_date'),
    return: numeric('return', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }),
    returnPercent: numeric('return_percent', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }),
    rMultiple: numeric('r_multiple', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    unique('trades_user_order_id_unique').on(table.userId, table.orderId),
    index('trades_user_entrydate_idx').on(table.userId, table.entryDate),
    index('trades_user_exitdate_idx').on(table.userId, table.exitDate),
    index('trades_user_idx').on(table.userId),
  ],
);

export const tradesRelations = relations(trades, ({ one, many }) => ({
  user: one(user, {
    fields: [trades.userId],
    references: [user.id],
  }),
  reviews: many(tradeReviews),
  tradeTags: many(tradeTags),
}));

export type Trade = typeof trades.$inferSelect;
export type NewTrade = typeof trades.$inferInsert;
