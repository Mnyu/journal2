import { z } from 'zod';

export const tradeReviewSchema = z.object({
  score: z.coerce.number().int().min(1).max(5),
  comments: z.string(),
});

export const tradeReviewsSchema = z.object({
  tradeId: z.string(),
  entry: tradeReviewSchema.optional(),
  exit: tradeReviewSchema.optional(),
});

export type TradeReviews = z.infer<typeof tradeReviewsSchema>;
