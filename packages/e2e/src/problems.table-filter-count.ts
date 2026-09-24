import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.table-filter-count'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Problems, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.two-problems'))
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.openProblems()

  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(3)

  await Problems.viewAsTable()

  const tableRows = Locator('.ProblemsTableBody .ProblemsTableRow')
  const filterBadge = Locator('.FilterBadge')
  await expect(tableRows).toHaveCount(2)
  await expect(filterBadge).toHaveCount(0)

  await Problems.handleFilterInput('first diagnostic')
  await expect(tableRows).toHaveCount(1)
  await expect(filterBadge).toHaveText('Showing 1 of 2')

  await Problems.handleFilterInput('')
  await expect(tableRows).toHaveCount(2)
  await expect(filterBadge).toHaveCount(0)

  await Problems.viewAsList()
  await Problems.handleFilterInput('first diagnostic')
  await expect(filterBadge).toHaveText('Showing 2 of 3')
}
