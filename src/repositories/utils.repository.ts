import { db } from '@/db/client';
import { SQL } from 'drizzle-orm';

export const executeNativeSqlFirstResult = async (
  nativeSql: (userId: string) => SQL,
  userId: string,
): Promise<Record<string, unknown> | null> => {
  const result = await db.execute(nativeSql(userId));
  const row = result.rows[0];
  return row ?? null;
};

export const executeNativeSql = async (
  nativeSql: (userId: string) => SQL,
  userId: string,
): Promise<Record<string, unknown>[]> => {
  const result = await db.execute(nativeSql(userId));
  if (!result || !result.rows) {
    return [];
  }
  return result.rows;
};
