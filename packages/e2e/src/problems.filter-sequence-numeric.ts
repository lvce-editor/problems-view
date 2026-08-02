import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-sequence-numeric'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  const input = Locator('.Panel .InputBox')
  const values = ['1', '12', '123', '0']

  for (const value of values) {
    await Problems.handleFilterInput(value)
    await expect(input).toHaveValue(value)
  }

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
}
