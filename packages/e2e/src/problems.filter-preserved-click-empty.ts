import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-preserved-click-empty'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.open('Problems')
  await Problems.handleFilterInput('keep me')

  await Problems.handleClickAt(10, 10)

  const input = Locator('.Panel .InputBox')
  await expect(input).toHaveValue('keep me')
}
