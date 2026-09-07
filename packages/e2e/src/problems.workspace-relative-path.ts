import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.workspace-relative-path'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const uri = `${tmpDir}/src/file.xyz`
  await FileSystem.writeFile(uri, 'content')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.one-problem'))

  await Main.openUri(uri)
  await Panel.openProblems()

  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(2)
  const fileGroup = problems.nth(0)
  await expect(fileGroup.locator('.Label')).toHaveText('file.xyz')
  await expect(fileGroup.locator('.LabelDetail')).toHaveText('src')
}
