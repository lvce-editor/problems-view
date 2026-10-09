import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.context-menu'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  // arrange
  await Panel.openProblems()
  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()

  // act
  await Problems.handleContextMenu(0, 0)

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = menu.locator('.MenuItem')
  const showErrors = menuItems.nth(0)
  const showWarnings = menuItems.nth(1)
  const showInfos = menuItems.nth(2)
  await expect(menuItems).toHaveCount(3)
  await expect(showErrors).toHaveText('Show Errors')
  await expect(showWarnings).toHaveText('Show Warnings')
  await expect(showInfos).toHaveText('Show Infos')
}
