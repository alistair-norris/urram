import type { Prisma } from '@urram/db/client'
import { db } from '@urram/db'

export const resetTables = async (tableNames: Prisma.ModelName[]) => {
  for (const tableName of tableNames) {
    // TRUNCATE is faster than DELETE and resets auto-increment counters
    await db.$executeRawUnsafe(`TRUNCATE TABLE "${tableName}" CASCADE;`)
  }
}
