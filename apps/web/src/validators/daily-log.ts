import z from 'zod'

export const LOG_TYPES = [
  'Pain',
  'Tiredness',
  'Drowsiness',
  'Nausea',
  'Lack of Appetite',
  'Shortness of Breath',
  'Depression',
  'Anxiety',
  'Wellbeing',
] as const

export const dailyLogUpsertSchema = z.object({
  date: z.date(),
})

export const logUpdateSchema = z.object({
  id: z.string(),
  value: z.number().min(0).max(10),
})
