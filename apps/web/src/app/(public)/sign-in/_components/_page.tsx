'use client'

import Image from 'next/image'
import { Link } from 'react-aria-components'

import { env } from '~/env'
import { SignInForm } from './sign-in-form'

export const SignInPageComponent = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded bg-white p-8">
        <div className="flex h-full w-full flex-col gap-4">
          <h2 className="prose-h3 text-base-content-brand text-center font-semibold">
            {/* Recommend max 2 lines of text here, or add logo */}
            {env.NEXT_PUBLIC_APP_NAME}
          </h2>
          <SignInForm />
          <div className="prose-caption-3 mt-4 text-center text-gray-500">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-gray-700 underline">
              Sign up
            </Link>
          </div>
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
