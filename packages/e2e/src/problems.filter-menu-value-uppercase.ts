import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-menu-value-uppercase'

export const test: Test = async ({ Command, expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  await Problems.handleFilterInput('ERROR')

  await Command.execute('Problems.handleClickMoreFilters', 0, 0)

  const menu = Locator('.Menu')
  const menuItems = menu.locator('.MenuItem')
  const input = Locator('.Panel .InputBox')
  await expect(menuItems).toHaveCount(3)
  await expect(menuItems.nth(0)).toHaveText('Show Errors')
  await expect(menuItems.nth(1)).toHaveText('Show Warnings')
  await expect(menuItems.nth(2)).toHaveText('Show Infos')
  await expect(input).toHaveValue('ERROR')
}
