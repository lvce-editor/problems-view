import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config.default,
  ...actions.default,
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
]
