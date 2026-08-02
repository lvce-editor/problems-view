import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-input'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.open('Problems')

  await Problems.handleFilterInput('missing')

  const input = Locator('.Panel .InputBox')
  await expect(input).toBeVisible()
  await expect(input).toHaveValue('missing')
}
