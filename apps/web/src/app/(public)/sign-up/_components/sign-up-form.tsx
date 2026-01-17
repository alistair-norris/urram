'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@opengovsg/oui'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

import { DASHBOARD_ROUTE } from '~/constants'
import { useTRPC } from '~/trpc/react'
import { signInSchema } from '~/validators/auth'

export const SignUpForm = () => {
  const router = useRouter()

  // TODO(jas): confirm password?
  const { handleSubmit, setError, control } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const trpc = useTRPC()
  const { mutate: register, isPending } = useMutation(
    trpc.auth.register.mutationOptions({
      onSuccess: () => {
        console.log('success')
        router.push(DASHBOARD_ROUTE)
      },
      onError: (error) => {
        console.log('errror', error)
        setError('email', { message: error.message })
      },
    }),
  )

  return (
    <form
      noValidate
      onSubmit={handleSubmit(({ email, password }) => {
        register({ email, password })
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
        Sign Up
      </Button>
    </form>
  )
}
