'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Badge, Button } from '@opengovsg/oui'
import { useMutation } from '@tanstack/react-query'

import { useTRPC } from '~/trpc/react'
import { startOfSgDay } from '~/utils/date'
import { LOG_TYPES } from '~/validators/daily-log'

export default function DashboardPage() {
  const router = useRouter()
  const trpc = useTRPC()
  const { mutate: getOrCreate, isPending } = useMutation(
    trpc.dailyLog.create.mutationOptions({
      onSuccess: ({ id }) => {
        router.push('/daily-log/' + id)
      },
    }),
  )
  const onStartLog = useCallback(() => {
    getOrCreate({ date: startOfSgDay().toDate() })
  }, [getOrCreate])

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="prose-h1">C-Logs</h1>
      <div className="flex flex-col gap-4 rounded-lg bg-blue-50 p-4">
        <h4 className="prose-h4">Start today's log now</h4>
        {/* TODO(jas) get completed logs */}
        <p className="prose-body text-sm">0/9 completed</p>
        <div className="flex flex-wrap gap-2">
          {LOG_TYPES.map((type) => (
            <Badge key={type} radius="full" variant="subtle">
              {type}
            </Badge>
          ))}
        </div>
        <Button onClick={onStartLog} isPending={isPending}>
          Start
        </Button>
      </div>
    </div>
  )
}
