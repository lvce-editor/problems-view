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
  await expect(problems.nth(0).locator('.Label')).toHaveText('file1.xyz')
  await expect(problems.nth(0).locator('.LabelDetail')).toHaveText('src/nested')
  await expect(problems.nth(1)).toHaveText('error 1xyz [Ln 1, Col 1]')
}
