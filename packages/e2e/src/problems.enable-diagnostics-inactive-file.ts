import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.enable-diagnostics-inactive-file'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Settings, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { uri: `${tmpDir}/file1.js`, content: 'content 1' },
    { uri: `${tmpDir}/active.txt`, content: 'plain text' },
  ])
  await Workspace.setPath(tmpDir)
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.enable-diagnostics'))
  await Extension.disableWorkspace('test.enable-diagnostics')
  await Settings.update({ 'editor.diagnostics': true })
  await Main.openUri(`${tmpDir}/file1.js`)
  await Main.openUri(`${tmpDir}/active.txt`)
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

  await Extension.disableWorkspace('test.enable-diagnostics')

  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
  await expect(badge).toHaveCount(0)

  await Extension.enableWorkspace('test.enable-diagnostics')

  await expect(badge).toHaveText(' 1')
  await expect(problems).toHaveCount(2)
  await expect(diagnostic).toHaveText('error 1test [Ln 1, Col 1]')
}
