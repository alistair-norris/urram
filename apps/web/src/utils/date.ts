import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export const startOfSgDay = (date?: Date | Dayjs) => {
  return dayjs(date).tz('Asia/Singapore').startOf('day')
}
