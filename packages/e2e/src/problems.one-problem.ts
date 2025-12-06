import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.one-problem'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')

  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(new URL(`../fixtures/${name}`, import.meta.url).toString())

  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.open('Problems')

  // assert
  const problemsView = Locator('.Problems')
  await expect(problemsView).toBeVisible()

  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(2)

  const firstProblem = problems.nth(0)
  await expect(firstProblem).toHaveText('file1.xyz1')

  const secondProblem = problems.nth(1)
  await expect(secondProblem).toHaveText('error 1xyz [Ln 0, Col 0]')
}
