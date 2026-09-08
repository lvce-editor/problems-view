import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.enable-diagnostics-inactive-file'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Settings, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.js`, 'content 1')
  await FileSystem.writeFile(`${tmpDir}/active.txt`, 'plain text')
  await Workspace.setPath(tmpDir)
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.enable-diagnostics'))
  await Extension.disableWorkspace('test.enable-diagnostics')
  await Settings.update({ 'editor.diagnostics': true })
  await Main.openUri(`${tmpDir}/file1.js`)
  await Main.openUri(`${tmpDir}/active.txt`)
  await Panel.openProblems()

  const problemsView = Locator('.Problems')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')

  await Extension.enableWorkspace('test.enable-diagnostics')

  await expect(Locator('[role="tab"][name="Problems"] .Badge')).toHaveText(' 1')
  await expect(Locator('.Problem')).toHaveCount(2)
  await expect(Locator('.Problem').nth(1)).toHaveText('error 1test [Ln 1, Col 1]')

  await Extension.disableWorkspace('test.enable-diagnostics')

  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
  await expect(Locator('[role="tab"][name="Problems"] .Badge')).toHaveCount(0)

  await Extension.enableWorkspace('test.enable-diagnostics')

  await expect(Locator('[role="tab"][name="Problems"] .Badge')).toHaveText(' 1')
  await expect(Locator('.Problem')).toHaveCount(2)
  await expect(Locator('.Problem').nth(1)).toHaveText('error 1test [Ln 1, Col 1]')
}
