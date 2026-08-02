import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-menu'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  // arrange
  await Panel.openProblems()
  await Problems.show()
  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  // act
  await Problems.handleClickMoreFilters(0, 0)

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = menu.locator('.MenuItem')
  await expect(menuItems).toHaveCount(3)
  await expect(menuItems.nth(0)).toHaveText('Show Errors')
  await expect(menuItems.nth(1)).toHaveText('Show Warnings')
  await expect(menuItems.nth(2)).toHaveText('Show Infos')
}
