'use server';

import { actionFailure, ActionResponse, actionSuccess } from '@/lib/action-response';
import { AppError, InternalError, ValidationError } from '@/lib/errors';
import { tradeReviewsSchema } from '@/schemas/trade-review.schema';
import * as tradeService from '@/services/trade.service';
import { TradeReviewsDTO } from '@/types/dto';
import { flattenError } from 'zod';

export const saveReviews = async (input: unknown): Promise<ActionResponse<TradeReviewsDTO>> => {
  try {
    const parsed = tradeReviewsSchema.safeParse(input);
    if (!parsed.success) {
      throw new ValidationError('Input validation failed', flattenError(parsed.error).fieldErrors);
    }
    const reviews = parsed.data;
    if (!reviews.entry && !reviews.exit) {
      throw new ValidationError('Both entry and exit reviews cannot be missing');
    }
    return actionSuccess(await tradeService.saveReviews(reviews));
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return actionFailure(error);
    }
    return actionFailure(new InternalError());
  }
};
