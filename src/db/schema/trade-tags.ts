import { index, pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { trades } from './trades';
import { tags } from './tags';
import { relations } from 'drizzle-orm';

export const tradeTags = pgTable(
  'trade_tags',
  {
    tradeId: uuid('trade_id')
      .references(() => trades.id, { onDelete: 'cascade' })
      .notNull(),
    tagId: uuid('tag_id')
      .references(() => tags.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.tradeId, table.tagId],
    }),
    index('ix_trade_tags_tag_id').on(table.tagId),
  ],
);

export const tradeTagsRelations = relations(tradeTags, ({ one }) => ({
  trade: one(trades, {
    fields: [tradeTags.tradeId],
    references: [trades.id],
  }),

  tag: one(tags, {
    fields: [tradeTags.tagId],
    references: [tags.id],
  }),
}));

export type TradeTag = typeof tradeTags.$inferSelect;
export type NewTradeTag = typeof tradeTags.$inferInsert;
