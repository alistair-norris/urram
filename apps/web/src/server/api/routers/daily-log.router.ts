import z from 'zod'

import { db } from '@urram/db'
import { LogType } from '@urram/db/client'

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { defaultDailyLogSelect } from '~/server/modules/daily-log/daily-log.select'
import { getUserById } from '~/server/modules/user/user.service'
import { dailyLogUpsertSchema, logUpdateSchema } from '~/validators/daily-log'

export const dailyLogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(dailyLogUpsertSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserById(ctx.session.userId)
      if (!user) {
        throw new Error('User not found')
      }

      const dailyLog = await db.dailyLog.upsert({
        where: {
          userId_date: {
            userId: user.id, // The field to check
            date: input.date,
          },
        },
        update: {}, // do nothing if the log exists
        create: {
          userId: user.id,
          date: input.date,
          logs: {
            create: Object.values(LogType)
              .filter((type) => type !== LogType.OTHERS)
              .map((type) => ({
                logType: type as LogType,
              })),
          },
        },
        select: defaultDailyLogSelect,
      })

      return dailyLog
    }),

  getLog: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const user = await getUserById(ctx.session.userId)
      if (!user) {
        throw new Error('User not found')
      }

      const dailyLog = await db.dailyLog.findUniqueOrThrow({
        where: {
          id: id,
          userId: user.id,
        },
        select: defaultDailyLogSelect,
      })

      return dailyLog
    }),

  saveLogAnswer: protectedProcedure
    .input(logUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserById(ctx.session.userId)
      if (!user) {
        throw new Error('User not found')
      }

      const updatedLog = await db.log.update({
        where: {
          id: input.id,
          dailyLog: {
            userId: user.id,
          },
        },
        data: {
          logValue: input.value,
        },
      })

      return updatedLog
    }),
})
