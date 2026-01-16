import baseConfig from '@urram/eslint-config/base'
import reactConfig from '@urram/eslint-config/react'

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
  ...reactConfig,
]
