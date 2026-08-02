import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.toggle-show-errors'

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

  // click "Show Errors" menu item to toggle it off
  const menuItems = menu.locator('.MenuItem')
  const showErrorsMenuItem = menuItems.nth(0)
  await expect(showErrorsMenuItem).toHaveText('Show Errors')
  await showErrorsMenuItem.click()

  // assert - error problems should not be displayed
  await expect(menu).toBeHidden()
  const problemsAfterToggle = Locator('.Problem')
  await expect(problemsAfterToggle).toHaveCount(3) // file header + 2 problems (warning, info, no error)
}
