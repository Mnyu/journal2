import { requireAPIKey } from '@/lib/auth-session';
import { AppError, InternalError, ValidationError } from '@/lib/errors';
import { createTradeDTOsSchema } from '@/schemas/trade.schema';
import { saveTrades } from '@/services/trade.service';
import { apiError, apiSuccess } from '@/types/api';
import { flattenError } from 'zod';

export const POST = async (request: Request) => {
  try {
    const { userId } = await requireAPIKey(request);
    const body = await request.json();
    const parsed = createTradeDTOsSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError('request validation failed', flattenError(parsed.error).fieldErrors);
    }
    await saveTrades(userId, parsed.data);
    return apiSuccess('trades ingested successfully', null, 201);
  } catch (error) {
    if (error instanceof AppError) {
      return apiError(error);
    }
    apiError(new InternalError());
  }
};
