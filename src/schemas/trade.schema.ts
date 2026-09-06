import { z } from 'zod';

export const tradeListFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(1000).default(10),
  symbol: z.string().trim().optional(),
  sort: z.enum(['createdAt', 'symbol', 'entryDate', 'exitDate']).default('createdAt'),
  direction: z.enum(['asc', 'desc']).default('desc'),
});

export const createTradeDTOSchema = z.object({
  orderId: z.string().nonempty(),
  symbol: z.string().nonempty(),
  strategy: z.string().nonempty(),
  entry: z.number().positive(),
  quantity: z.number().positive(),
  risk: z.number().positive(),
  entryDate: z.iso.date(),
  exit: z.number().positive().optional(),
  exitDate: z.iso.date().optional(),
});

export const createTradeDTOsSchema = z.array(createTradeDTOSchema).min(1).max(1000);

export type TradeListFilters = z.infer<typeof tradeListFiltersSchema>;
export type CreateTradeDTOs = z.infer<typeof createTradeDTOsSchema>;
