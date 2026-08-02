import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-replace'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  await Problems.handleFilterInput('first')

  await Problems.handleFilterInput('second')

  const input = Locator('.Panel .InputBox')
  await expect(input).toHaveValue('second')
}
