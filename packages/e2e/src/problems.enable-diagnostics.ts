import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.enable-diagnostics'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Settings, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.js`, 'content 1')
  await Workspace.setPath(tmpDir)
  await Extension.addWebExtension(import.meta.resolve(`../fixtures/${name}`))
  await Extension.disableWorkspace('test.enable-diagnostics')
  await Settings.update({ 'editor.diagnostics': true })
  await Main.openUri(`${tmpDir}/file1.js`)
  await Panel.openProblems()

  const problemsView = Locator('.Problems')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')

  await Extension.enableWorkspace('test.enable-diagnostics')

  await expect(Locator('[role="tab"][name="Problems"] .Badge')).toHaveText(' 1')
  await expect(Locator('.Problem')).toHaveCount(2)
  await expect(Locator('.Problem').nth(1)).toHaveText('error 1test [Ln 1, Col 1]')
}
