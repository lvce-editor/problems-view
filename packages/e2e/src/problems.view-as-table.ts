import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.view-as-table'

export const skip = 1

export const test: Test = async ({ Main, Command, FileSystem, Workspace, Extension, Locator, Panel, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(new URL(`../fixtures/problems.one-problem`, import.meta.url).toString())
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.open('Problems')
  const problemsView = Locator('.Problems')
  await expect(problemsView).toBeVisible()
  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(2)
  const firstProblem = problems.nth(0)
  await expect(firstProblem).toHaveText('file1.xyz1')
  const secondProblem = problems.nth(1)
  await expect(secondProblem).toHaveText('error 1xyz [Ln 0, Col 0]')

  // act
  await Command.execute('Problems.viewAsTable')

  // assert
  const table = Locator('.ProblemsTable')
  await expect(table).toBeVisible()
  const tableBody = Locator('.ProblemsTableBody')
  const cellCode = tableBody.locator('.ProblemsTableRowItem').nth(1)
  await expect(cellCode).toHaveText('xyz ')
  const cellMessage = tableBody.locator('.ProblemsTableRowItem').nth(2)
  await expect(cellMessage).toHaveText('error 1 ')
  const cellFile = tableBody.locator('.ProblemsTableRowItem').nth(3)
  await expect(cellFile).toHaveText('memfs://workspace/file1.xyz')
  const cellSource = tableBody.locator('.ProblemsTableRowItem').nth(4)
  await expect(cellSource).toHaveText('xyz')
}
