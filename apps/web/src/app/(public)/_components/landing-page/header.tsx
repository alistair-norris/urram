import Link from 'next/link'

import { LinkButton } from '@urram/ui/link-button'

import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '~/constants'

interface LandingPageHeaderProps {
  isAuthed: boolean
}

export const LandingPageHeader = ({ isAuthed }: LandingPageHeaderProps) => {
  return (
    <div className="col-span-full flex items-center justify-between py-2.5 md:col-span-10 md:col-start-2 md:py-18">
      <Link href="/">Urram</Link>
      <div className="text-subhead-1 flex items-center gap-4 md:gap-8 xl:gap-10">
        <LinkButton
          href={isAuthed ? DASHBOARD_ROUTE : LOGIN_ROUTE}
          variant="solid"
        >
          {isAuthed ? 'Go to app' : 'Sign in'}
        </LinkButton>
      </div>
    </div>
  )
}
