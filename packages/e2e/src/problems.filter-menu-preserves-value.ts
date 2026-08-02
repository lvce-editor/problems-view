import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-menu-preserves-value'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.open('Problems')
  await Problems.handleFilterInput('keep me')

  await Problems.handleClickMoreFilters(0, 0)

  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const input = Locator('.Panel .InputBox')
  await expect(input).toHaveValue('keep me')
}
