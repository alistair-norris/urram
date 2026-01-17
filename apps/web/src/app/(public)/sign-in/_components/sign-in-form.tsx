'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@opengovsg/oui'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

import { DASHBOARD_ROUTE } from '~/constants'
import { useTRPC } from '~/trpc/react'
import { signInSchema } from '~/validators/auth'

export const SignInForm = () => {
  const router = useRouter()

  const { handleSubmit, setError, control } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const trpc = useTRPC()
  const { mutate: login, isPending } = useMutation(
    trpc.auth.login.mutationOptions({
      onSuccess: () => {
        router.push(DASHBOARD_ROUTE)
      },
      onError: (error) => {
        setError('email', { message: error.message })
      },
    }),
  )

  return (
    <form
      noValidate
      onSubmit={handleSubmit(({ email, password }) => {
        login({ email, password })
      })}
      className="flex flex-1 flex-col gap-4"
    >
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <TextField
            size="xs"
            inputProps={{
              placeholder: 'e.g. hello@example.com',
            }}
            errorMessage={error?.message}
            isRequired
            isInvalid={!!error}
            {...field}
            label="Email"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <TextField
            size="xs"
            type="password"
            errorMessage={error?.message}
            isRequired
            isInvalid={!!error}
            {...field}
            label="Password"
          />
        )}
      />
      <Button size="sm" isPending={isPending} type="submit">
        Login
      </Button>
    </form>
  )
}
