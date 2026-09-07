import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-input-name'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.open('Problems')
  const input = Locator('.Panel .InputBox')
  await expect(input).toHaveAttribute('name', 'ProblemsInput')

  const values = ['missing', 'a/b ☃', '', 'restored filter']
  for (const value of values) {
    await Problems.handleFilterInput(value)
    await expect(input).toHaveValue(value)
    await expect(input).toHaveAttribute('name', 'ProblemsInput')
  }
}
