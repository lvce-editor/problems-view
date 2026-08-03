import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  ...config.recommendedVirtualDom,
  ...config.recommendedVirtualDomStrict,
  ...config.recommendedRegex,
  ...config.recommendedE2e,
  ...config.recommendedTsconfig,
  ...config.recommendedActions,
  {
    rules: {
      'sonarjs/assertions-in-tests': 'off',
      'sonarjs/prefer-specific-assertions': 'off',
    },
  },
  {
    files: ['packages/problems-view/test/**/*.ts'],
    rules: {
      'virtual-dom/no-inline-event-handlers': 'off',
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
      'virtual-dom/prefer-state-destructuring': 'off',
    },
  },
  {
    files: ['packages/problems-view/test/Main.test.ts'],
    rules: {
      'jest/expect-expect': 'off',
    },
  },
])
