import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.numeric-types'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve(`../fixtures/${name}`))
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.openProblems()

  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(5)
  const header = problems.nth(0)
  const error = problems.nth(1)
  const warning = problems.nth(2)
  const spelling = problems.nth(3)
  const info = problems.nth(4)
  await expect(header).toHaveText('file1.xyz4')
  await expect(error).toHaveText('error 1xyz [Ln 1, Col 1]')
  await expect(error.locator('.ProblemsErrorIcon')).toBeVisible()
  await expect(warning).toHaveText('warning 1xyz [Ln 1, Col 1]')
  await expect(warning.locator('.ProblemsWarningIcon')).toBeVisible()
  await expect(spelling).toHaveText('spelling 1xyz [Ln 1, Col 1]')
  await expect(info).toHaveText('info 1xyz [Ln 1, Col 1]')
}
