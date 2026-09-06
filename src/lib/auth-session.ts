import 'server-only';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { UnauthorizedError } from './errors';
import { getDateString } from './utils';
import { AuthenticatedAPIUser } from '@/types/domain';

const getSession = async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
};

export const requireSession = cache(async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }
  return session;
});

export const requireSessionOrRedirect = cache(async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    redirect('/signin');
  }
  return session;
});

export const redirectIfSessionPresent = async () => {
  const session = await getSession();
  if (session?.user?.id) {
    redirect('/');
  }
  return null;
};

export const getKeys = async () => {
  const { apiKeys, total, limit, offset } = await auth.api.listApiKeys({
    headers: await headers(),
  });
  return { keys: buildKeysDTOFromKeys(apiKeys), total, limit, offset };
};

export const requireAPIKey = async (request: Request): Promise<AuthenticatedAPIUser> => {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) {
    throw new UnauthorizedError('no api key provided');
  }
  const result = await auth.api.verifyApiKey({
    body: {
      key: apiKey,
    },
  });
  if (!result.valid || !result.key) {
    throw new UnauthorizedError('invalid API key');
  }
  return {
    userId: result.key.referenceId,
    apiKeyId: result.key.id,
    permissions: result.key.permissions,
  };
};

const buildKeysDTOFromKeys = (keys: APIKey[]) => {
  return keys.map((k) => ({
    id: k.id,
    name: k.name,
    status: k.enabled ? 'active' : 'inactive',
    created: getDateString(k.createdAt),
    expires: k.expiresAt ? getDateString(k.expiresAt) : 'never',
    lastUsed: k.lastRequest ? getDateString(k.lastRequest) : 'never',
  }));
};

type APIKey = {
  metadata: Record<string, any> | null;
  permissions: {
    [key: string]: string[];
  } | null;
  id: string;
  configId: string;
  name: string | null;
  start: string | null;
  prefix: string | null;
  referenceId: string;
  refillInterval: number | null;
  refillAmount: number | null;
  lastRefillAt: Date | null;
  enabled: boolean;
  rateLimitEnabled: boolean;
  rateLimitTimeWindow: number | null;
  rateLimitMax: number | null;
  requestCount: number;
  remaining: number | null;
  lastRequest: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
