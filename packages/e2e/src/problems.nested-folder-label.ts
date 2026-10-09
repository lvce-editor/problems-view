import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.nested-folder-label'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const uri = `${tmpDir}/src/nested/file1.xyz`
  await FileSystem.setFiles([{ content: 'content 1', uri }])
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.one-problem'))
  await Main.openUri(uri)
  await Panel.openProblems()

  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(2)
  const header = problems.nth(0)
  const problem = problems.nth(1)
  await expect(header.locator('.Label')).toHaveText('file1.xyz')
  await expect(header.locator('.LabelDetail')).toHaveText('src/nested')
  await expect(problem).toHaveText('error 1xyz [Ln 1, Col 1]')
}
