import baseConfig, { restrictEnvAccess } from '@urram/eslint-config/base'
import nextjsConfig from '@urram/eslint-config/nextjs'
import reactConfig from '@urram/eslint-config/react'
import storybookConfig from '@urram/eslint-config/storybook'

export default [
  {
    ignores: ['.next/**', 'public/mockServiceWorker.js'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...storybookConfig,
  ...restrictEnvAccess,
  {
    files: ['**/__tests__/**'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
]
