import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-menu-value-numeric'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.open('Problems')
  await Problems.handleFilterInput('404')

  await Problems.handleClickMoreFilters(0, 0)

  const menu = Locator('.Menu')
  const menuItems = menu.locator('.MenuItem')
  const input = Locator('.Panel .InputBox')
  const showErrors = menuItems.nth(0)
  const showWarnings = menuItems.nth(1)
  const showInfos = menuItems.nth(2)
  await expect(menuItems).toHaveCount(3)
  await expect(showErrors).toHaveText('Show Errors')
  await expect(showWarnings).toHaveText('Show Warnings')
  await expect(showInfos).toHaveText('Show Infos')
  await expect(input).toHaveValue('404')
}
