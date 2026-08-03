import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.toolbar-actions'

const waitFor = async (assertion: () => Promise<void>, attempts = 100): Promise<void> => {
  try {
    await assertion()
  } catch (error) {
    if (attempts <= 1) {
      throw error
    }
    await new Promise((resolve) => setTimeout(resolve, 10))
    await waitFor(assertion, attempts - 1)
  }
}

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(new URL('../fixtures/problems.one-problem', import.meta.url).toString())
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.openProblems()

  const viewAsTable = Locator('button[title="View as Table"]')
  await expect(viewAsTable).toHaveAttribute('name', 'viewAsTable')
  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered Problems action instead of its command API.
  await viewAsTable.click()
  const viewAsList = Locator('button[title="View as List"]')
  await waitFor(() => expect(viewAsList).toBeVisible())
  const problemsTable = Locator('.ProblemsTable')
  await expect(problemsTable).toBeVisible()

  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered Problems action instead of its command API.
  await viewAsList.click()
  await waitFor(() => expect(viewAsTable).toBeVisible())

  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(2)
  const collapseAll = Locator('button[title="Collapse All"]')
  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered Problems action instead of its command API.
  await collapseAll.click()
  await waitFor(() => expect(problems).toHaveCount(1))

  const moreFilters = Locator('button[title="more filters"]')
  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered Problems action instead of its command API.
  await moreFilters.click()
  const menuItems = Locator('.MenuItem')
  await waitFor(() => expect(menuItems).toHaveCount(3))
  await expect(menuItems.nth(0)).toHaveText('Show Errors')
  await expect(menuItems.nth(1)).toHaveText('Show Warnings')
  await expect(menuItems.nth(2)).toHaveText('Show Infos')
}
