import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-whitespace'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  const filterValue = ' '.repeat(3)

  await Problems.handleFilterInput(filterValue)

  const input = Locator('.Panel .InputBox')
  await expect(input).toBeVisible()
  await expect(input).toHaveValue(filterValue)
}
