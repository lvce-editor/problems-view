import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-value-angle-brackets'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  const value = '<expected>'

  await Problems.handleFilterInput(value)

  const input = Locator('.Panel .InputBox')
  const problemsView = Locator('.Viewlet.Problems')
  await expect(input).toBeVisible()
  await expect(input).toHaveValue(value)
  await expect(problemsView).toBeVisible()
}
