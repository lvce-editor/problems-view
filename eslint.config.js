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
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'e2e/no-inline-nth-in-expect': 'off',
      'e2e/prefer-import-meta-resolve': 'off',
      'sonarjs/assertions-in-tests': 'off',
      'sonarjs/prefer-specific-assertions': 'off',
      'unicorn/no-immediate-mutation': 'off',
      'unicorn/no-useless-template-literals': 'off',
      'unicorn/prefer-url-href': 'off',
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
