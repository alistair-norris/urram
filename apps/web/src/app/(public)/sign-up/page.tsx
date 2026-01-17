import { redirect } from 'next/navigation'

import { DASHBOARD_ROUTE } from '~/constants'
import { getSession } from '~/server/session'
import { SignUpPageComponent } from './_components/_page'

export default async function SignInPage() {
  const session = await getSession()

  if (session.userId) {
    redirect(DASHBOARD_ROUTE)
  }

  return <SignUpPageComponent />
}
