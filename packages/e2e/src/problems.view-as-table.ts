import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.view-as-table'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Problems, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.one-problem'))
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.openProblems()
  const problemsView = Locator('.Problems')
  await expect(problemsView).toBeVisible()
  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(2)
  const firstProblem = problems.nth(0)
  await expect(firstProblem).toHaveText('file1.xyz1')
  const secondProblem = problems.nth(1)
  await expect(secondProblem).toHaveText('error 1xyz [Ln 1, Col 1]')

  // act
  await Problems.viewAsTable()

  // assert
  const table = Locator('.ProblemsTable')
  await expect(table).toBeVisible()
  const tableBody = Locator('.ProblemsTableBody')
  const cellCode = tableBody.locator('.ProblemsTableRowItem').nth(1)
  await expect(cellCode).toHaveText('xyz ')
  const cellMessage = tableBody.locator('.ProblemsTableRowItem').nth(2)
  await expect(cellMessage).toHaveText('error 1')
  const cellFile = tableBody.locator('.ProblemsTableRowItem').nth(3)
  await expect(cellFile).toHaveText(`${tmpDir}/file1.xyz`)
  const cellSource = tableBody.locator('.ProblemsTableRowItem').nth(4)
  await expect(cellSource).toHaveText('xyz')
  const header = Locator('.ProblemsTableHeader')
  await expect(header).toHaveCSS('font-weight', '600')
  await expect(header.locator('.ProblemsTableRow')).toHaveCSS('display', 'grid')
  await expect(tableBody.locator('.ProblemsTableRow')).toHaveCSS('display', 'grid')
  await expect(cellMessage).toHaveCSS('text-overflow', 'ellipsis')
  const severityCell = tableBody.locator('.ProblemsTableRowItem').nth(0)
  await expect(severityCell).toHaveCSS('width', '30px')
  const dividers = Locator('.ProblemsTableDivider')
  await expect(dividers).toHaveCount(4)
  const fixedDivider = Locator('.ProblemsTableDivider0')
  await expect(fixedDivider).toHaveCSS('pointer-events', 'none')
  const codeDivider = Locator('.ProblemsTableDivider1')
  await expect(codeDivider).toHaveCSS('cursor', 'col-resize')
}
