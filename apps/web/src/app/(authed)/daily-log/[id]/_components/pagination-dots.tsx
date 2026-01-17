import type { PaginationItemValue } from '@opengovsg/oui'
import { PaginationItemType } from '@opengovsg/oui'
import { cn } from '@opengovsg/oui-theme'

export const PaginationDots = ({
  range,
  activePage,
  setPage,
  onNext,
  onPrevious,
}: {
  range: PaginationItemValue[]
  activePage: number
  setPage: (page: number) => void
  onNext: () => void
  onPrevious: () => void
}) => {
  return (
    <ul className="flex items-center gap-2">
      {range.map((page) => {
        if (page === PaginationItemType.NEXT) {
          return (
            <li key={page} aria-label="next page" className="h-4 w-4">
              <button
                className="h-full w-full rounded-full bg-gray-200"
                onClick={onNext}
              >
                &gt;
              </button>
            </li>
          )
        }

        if (page === PaginationItemType.PREV) {
          return (
            <li key={page} aria-label="previous page" className="h-4 w-4">
              <button
                className="h-full w-full rounded-full bg-gray-200"
                onClick={onPrevious}
              >
                &lt;
              </button>
            </li>
          )
        }

        if (page === PaginationItemType.DOTS) {
          return (
            <li key={page} className="h-4 w-4">
              ...
            </li>
          )
        }

        return (
          <li key={page} aria-label={`page ${page}`} className="h-4 w-4">
            <button
              className={cn(
                'h-full w-full rounded-full bg-blue-300',
                activePage === page && 'bg-gray-500',
              )}
              onClick={() => setPage(page)}
            />
          </li>
        )
      })}
    </ul>
  )
}
