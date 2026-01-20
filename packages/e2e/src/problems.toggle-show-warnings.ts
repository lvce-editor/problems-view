import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.toggle-show-warnings'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(new URL(`../fixtures/problems.errors-warnings-infos`, import.meta.url).toString())
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.open('Problems')
  const problemsView = Locator('.Problems')
  await expect(problemsView).toBeVisible()

  // verify all problems are shown initially
  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(4) // file header + 3 problems (error, warning, info)

  // act - open filter menu
  await Command.execute('Problems.handleClickMoreFilters', 0, 0)
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()

  // click "Show Warnings" menu item to toggle it off
  const menuItems = menu.locator('.MenuItem')
  const showWarningsMenuItem = menuItems.nth(1)
  await expect(showWarningsMenuItem).toHaveText('Show Warnings')
  await showWarningsMenuItem.click()

  // assert - warning problems should not be displayed
  await expect(menu).toBeHidden()
  const problemsAfterToggle = Locator('.Problem')
  await expect(problemsAfterToggle).toHaveCount(3) // file header + 2 problems (error, info, no warning)
}
