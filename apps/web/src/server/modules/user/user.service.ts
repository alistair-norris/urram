import { parseOneAddress } from 'email-addresses'

import { db } from '@urram/db'

import { createPasswordHash, isValidPassword } from '../auth/auth.utils'
import { defaultUserSelect } from './user.select'

export const createUser = async (email: string, password: string) => {
  console.log('creating user!!!')
  const existingUser = await db.user.findUnique({
    where: { email },
  })
  console.log('Existing user:', existingUser)
  if (existingUser) {
    throw new Error('Email is already registered')
  }

  const newUser = await db.user.create({
    data: {
      email,
      passwordHash: createPasswordHash(password),
      lastLogin: new Date(),
    },
    select: defaultUserSelect,
  })

  return newUser
}

export const loginUser = async (email: string, password: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: {
      ...defaultUserSelect,
      passwordHash: true,
    },
  })
  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isPasswordValid = isValidPassword(password, user.passwordHash)
  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  // Update last login time
  await db.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  })

  // Remove passwordHash before returning user
  const { passwordHash, ...userWithoutPassword } = user
  return userWithoutPassword
}

export const getUserById = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: defaultUserSelect,
  })
  return user
}
