import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-sequence-prefix-suffix'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.open('Problems')
  const input = Locator('.Panel .InputBox')
  const values = ['error', 'pre-error', 'pre-error-post']

  for (const value of values) {
    await Problems.handleFilterInput(value)
    await expect(input).toHaveValue(value)
  }

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
}
