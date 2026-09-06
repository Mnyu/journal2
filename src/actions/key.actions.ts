'use server';

import { auth } from '@/lib/auth';
import { requireSession } from '@/lib/auth-session';
import { ValidationError } from '@/lib/errors';
import { CreateAPIKeyInput, createAPIKeySchema } from '@/schemas/key.schema';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { flattenError } from 'zod';

export const createAPIKey = async (input: CreateAPIKeyInput) => {
  const parsed = createAPIKeySchema.safeParse(input);
  if (!parsed.success) {
    throw new ValidationError('Input validation failed', flattenError(parsed.error).fieldErrors);
  }
  const createAPIKeyInput = parsed.data;
  const session = await requireSession();
  const apiKey = await auth.api.createApiKey({
    body: {
      userId: session.user.id,
      name: createAPIKeyInput.name,
    },
  });
  revalidatePath('/settings');
  return apiKey;
};

export const deleteAPIKey = async (id: string) => {
  await auth.api.deleteApiKey({
    body: {
      keyId: id,
    },
    headers: await headers(), // authentication is done internally here
  });
  revalidatePath('/settings');
};
