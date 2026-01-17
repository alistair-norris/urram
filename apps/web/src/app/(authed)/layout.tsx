import { redirect } from 'next/navigation'

import type { DynamicLayoutProps } from '~/types/nextjs'
import { LOGIN_ROUTE } from '~/constants'
import { getSession } from '~/server/session'
import { HydrateClient, prefetch, trpc } from '~/trpc/server'
import { HackathonBanner } from '../_components/hackathon-banner'
import { VersionCheckWrapper } from '../_components/version-check-wrapper'
import { BottomNavbar } from './_components/bottom-navbar'

export default async function AuthedLayout({ children }: DynamicLayoutProps) {
  // DO NOT SKIP AUTHENTICATION CHECKS IN YOUR PROCEDURES.
  // It is NOT secure. You can access a page data bypassing a layout call. It’s not trivial but it can be done.
  // Always put your auth call as close to the actual data call as possible, ideally right before access.

  const session = await getSession()
  if (!session.userId) {
    redirect(LOGIN_ROUTE)
  }
  await prefetch(trpc.me.get.queryOptions())

  return (
    <HydrateClient>
      <main className="mx-auto flex min-h-dvh max-w-[430px] flex-col">
        <HackathonBanner />
        <VersionCheckWrapper />
        <div className="container mx-auto flex flex-col gap-4 p-4">
          {children}
        </div>
        <BottomNavbar />
      </main>
    </HydrateClient>
  )
}
