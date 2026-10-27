import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.duplicate-syntax-code'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, '{[]')

  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve(`../fixtures/${name}`))

  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.openProblems()

  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(2)

  const diagnostic = problems.nth(1)
  await expect(diagnostic).toHaveText('Expected a quoted property name.json(syntax) [Ln 1, Col 3]')
  await expect(diagnostic.locator('.ProblemsErrorIcon')).toBeVisible()
}
