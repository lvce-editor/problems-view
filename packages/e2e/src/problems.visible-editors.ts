import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.visible-editors'
export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Settings, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const javascriptUri = `${tmpDir}/geometry.js`
  const settingsUri = `${tmpDir}/settings.js`
  await FileSystem.setFiles([
    { content: 'const geometry = 1', uri: javascriptUri },
    { content: 'const settings = true', uri: settingsUri },
  ])
  await Workspace.setPath(tmpDir)
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.enable-diagnostics'))
  await Extension.disableWorkspace('test.enable-diagnostics')
  await Settings.update({ 'editor.diagnostics': true })
  await Main.openUri(javascriptUri)
  await Main.openUri(settingsUri)
  await Panel.openProblems()

  const problemsView = Locator('.Viewlet.Problems')
  const problemRows = Locator('.Problem')
  const firstProblem = problemRows.nth(0)
  const secondProblem = problemRows.nth(1)
  const badge = Locator('[role="tab"][name="Problems"] .Badge')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
  await Extension.enableWorkspace('test.enable-diagnostics')

  await expect(problemRows).toHaveCount(2)
  await expect(firstProblem).toHaveText('settings.js1')
  await expect(secondProblem).toHaveText('error 1test [Ln 1, Col 1]')
  await expect(badge).toHaveText(' 1')

  await Main.openUri(javascriptUri)
  await expect(problemRows).toHaveCount(2)
  await expect(firstProblem).toHaveText('geometry.js1')
  await expect(secondProblem).toHaveText('error 1test [Ln 1, Col 1]')
  await expect(badge).toHaveText(' 1')

  await Main.openUri(settingsUri)
  await expect(problemRows).toHaveCount(2)
  await expect(firstProblem).toHaveText('settings.js1')
  await expect(secondProblem).toHaveText('error 1test [Ln 1, Col 1]')
}
