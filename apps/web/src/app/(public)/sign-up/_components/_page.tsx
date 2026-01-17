'use client'

import Image from 'next/image'
import { Link } from 'react-aria-components'

import { env } from '~/env'
import { SignUpForm } from './sign-up-form'

export const SignUpPageComponent = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded bg-white p-8">
        <div className="flex h-full w-full flex-col gap-4">
          <h2 className="prose-h3 text-base-content-brand text-center font-semibold">
            {/* Recommend max 2 lines of text here, or add logo */}
            {env.NEXT_PUBLIC_APP_NAME}
          </h2>
          <SignUpForm />
          <div className="prose-caption-3 my-12 flex items-center whitespace-pre">
            Built by{' '}
            <Link
              href="https://www.open.gov.sg/"
              target="_blank"
              className="inline-flex"
            >
              <Image
                className="h-auto w-auto"
                src="/assets/restricted-ogp-text-logo.svg"
                height={12}
                width={232}
                alt="Open Government Products"
              />
            </Link>
          </div>
        </div>{' '}
      </div>
    </div>
  )
}
