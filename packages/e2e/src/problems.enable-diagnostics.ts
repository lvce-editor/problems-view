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
  const badge = Locator('[role="tab"][name="Problems"] .Badge')
  const problems = Locator('.Problem')
  const diagnostic = problems.nth(1)
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')

  await Extension.enableWorkspace('test.enable-diagnostics')

  await expect(badge).toHaveText(' 1')
  await expect(problems).toHaveCount(2)
  await expect(diagnostic).toHaveText('error 1test [Ln 1, Col 1]')
}
