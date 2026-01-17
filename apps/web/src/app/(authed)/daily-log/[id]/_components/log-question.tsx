'use client'

import { Button } from '@opengovsg/oui'
import { useMutation } from '@tanstack/react-query'

import type { Log } from '@urram/db/client'

import { useTRPC } from '~/trpc/react'

export const LogQuestion = ({
  log,
  onNext,
}: {
  log: Log
  onNext: VoidFunction
}) => {
  const trpc = useTRPC()
  const { mutate: saveLogAnswer, isPending } = useMutation(
    trpc.dailyLog.saveLogAnswer.mutationOptions({ onSuccess: onNext }),
  )

  return (
    <div className="flex flex-col">
      <div>
        How is your {log.logType.replaceAll('_', ' ').toLowerCase()} today?
      </div>
      {Array.from({ length: 11 }).map((_, index) => (
        <Button
          key={index}
          className="m-1"
          variant="outline"
          onClick={() => saveLogAnswer({ id: log.id, value: index })}
          isPending={isPending}
        >
          {index}
        </Button>
      ))}
    </div>
  )
}
