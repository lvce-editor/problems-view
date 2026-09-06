import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.toolbar-actions'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.one-problem'))
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.openProblems()

  const viewAsTable = Locator('button[title="View as Table"]')
  await expect(viewAsTable).toHaveAttribute('name', 'viewAsTable')
  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered Problems action instead of its command API.
  await viewAsTable.click()
  const viewAsList = Locator('button[title="View as List"]')
  await expect(viewAsList).toBeVisible()
  const problemsTable = Locator('.ProblemsTable')
  await expect(problemsTable).toBeVisible()

  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered Problems action instead of its command API.
  await viewAsList.click()
  await expect(viewAsTable).toBeVisible()

  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(2)
  const collapseAll = Locator('button[title="Collapse All"]')
  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered Problems action instead of its command API.
  await collapseAll.click()
  await expect(problems).toHaveCount(1)

  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered Problems action after collapsing the list.
  await viewAsTable.click()
  await expect(problemsTable).toBeVisible()
  const tableRows = problemsTable.locator('.ProblemsTableBody .ProblemsTableRow')
  await expect(tableRows).toHaveCount(1)

  const moreFilters = Locator('button[title="more filters"]')
  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered Problems action instead of its command API.
  await moreFilters.click()
  const menuItems = Locator('.MenuItem')
  const showErrors = menuItems.nth(0)
  const showWarnings = menuItems.nth(1)
  const showInfos = menuItems.nth(2)
  await expect(menuItems).toHaveCount(3)
  await expect(showErrors).toHaveText('Show Errors')
  await expect(showWarnings).toHaveText('Show Warnings')
  await expect(showInfos).toHaveText('Show Infos')
}
