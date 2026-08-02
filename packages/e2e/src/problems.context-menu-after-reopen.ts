import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.context-menu-after-reopen'

export const test: Test = async ({ Command, expect, Locator, Output, Panel }) => {
  await Panel.openProblems()
  await Output.show()
  await Panel.openProblems()

  await Command.execute('Problems.handleContextMenu', 0, 0)

  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = menu.locator('.MenuItem')
  await expect(menuItems).toHaveCount(3)
}
