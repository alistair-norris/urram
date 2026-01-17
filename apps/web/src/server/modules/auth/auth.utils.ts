import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import { customAlphabet } from 'nanoid'

import { OTP_LENGTH, OTP_PREFIX_LENGTH } from '~/validators/auth'

// Alphabet space with ambiguous characters removed.
const OTP_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
const OTP_PREFIX_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ'

export const createPasswordHash = (password: string, salt?: string) => {
  const usedSalt = salt || randomBytes(16).toString('base64')
  const hash = scryptSync(password, usedSalt, 64).toString('base64')
  return `${hash}:${usedSalt}`
}

export const isValidPassword = (password: string, storedHash: string) => {
  try {
    const [hash, salt] = storedHash.split(':')
    return timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(createPasswordHash(password, salt)),
    )
  } catch {
    // In case of any error (e.g. buffer size mismatch), return false
    return false
  }
}
