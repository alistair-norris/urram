import type { Prisma } from '@urram/db/client'

/**
 * Default selector for when retrieving user fields.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
export const defaultDailyLogSelect = {
  id: true,
  date: true,
  logs: true,
} satisfies Prisma.DailyLogSelect
