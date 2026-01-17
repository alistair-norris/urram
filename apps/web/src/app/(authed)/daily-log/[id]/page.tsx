'use client'

import { useParams, useRouter } from 'next/navigation'
import { usePagination } from '@opengovsg/oui'
import { useSuspenseQuery } from '@tanstack/react-query'

import { DASHBOARD_ROUTE } from '~/constants'
import { useTRPC } from '~/trpc/react'
import { LogQuestion } from './_components/log-question'
import { PaginationDots } from './_components/pagination-dots'

export default function DailyLogPage() {
  const router = useRouter()
  const { id: dailyLogId } = useParams<{ id: string }>()

  const trpc = useTRPC()
  const { data: dailyLog } = useSuspenseQuery(
    trpc.dailyLog.getLog.queryOptions({ id: dailyLogId }),
  )

  const usePaginationReturn = usePagination({
    total: dailyLog.logs.length,
    showControls: false,
    siblings: dailyLog.logs.length,
    boundaries: dailyLog.logs.length,
  })
  const { activePage, setPage } = usePaginationReturn

  return (
    <div className="h-full w-full">
      <LogQuestion
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        log={dailyLog.logs[activePage - 1]!}
        onNext={() =>
          activePage === dailyLog.logs.length
            ? router.push(DASHBOARD_ROUTE)
            : setPage(activePage + 1)
        }
      />
      <div className="bottom-0 mt-4 flex w-full justify-center">
        <PaginationDots {...usePaginationReturn} />
      </div>
    </div>
  )
}
