import type { DynamicLayoutProps } from '~/types/nextjs'
import { HackathonBanner } from '../_components/hackathon-banner'
import { VersionCheckWrapper } from '../_components/version-check-wrapper'

export default function PublicLayout({ children }: DynamicLayoutProps) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[430px] flex-col">
      <HackathonBanner />
      <VersionCheckWrapper />
      {children}
    </main>
  )
}
