import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.close-settings-diagnostics'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Settings, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const settingsUri = `${tmpDir}/settings.json`
  const otherUri = `${tmpDir}/other.js`
  await FileSystem.setFiles([
    { content: '{ "valid": true }', uri: settingsUri },
    { content: 'const other = true', uri: otherUri },
  ])
  await Workspace.setPath(tmpDir)
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.settings-diagnostics'))
  await Extension.disableWorkspace('test.settings-diagnostics')
  await Settings.update({ 'editor.diagnostics': true })
  await Main.openUri(settingsUri)
  await Main.openUri(otherUri)
  await Panel.openProblems()

  const problemsView = Locator('.Problems')
  const otherProblemText = ['other.js', '1', 'problem for other.js', 'test [Ln 1, Col 1]'].join('')
  const badge = Locator('[role="tab"][name="Problems"] .Badge')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')

  await Extension.enableWorkspace('test.settings-diagnostics')
  await expect(badge).toHaveText(' 2')
  await expect(problemsView).toContainText('problem for other.js')
  await expect(problemsView).toContainText('problem for settings.json')

  await Main.handleClickCloseTab('0', '0')

  await expect(problemsView).toHaveText(otherProblemText)
  await expect(problemsView).toContainText('problem for other.js')
  await expect(badge).toHaveText(' 1')

  await Main.closeActiveEditor()
  await expect(badge).toHaveCount(0)
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')

  await Main.openUri(settingsUri)
  await expect(badge).toHaveText(' 1')
  await expect(problemsView).toContainText('problem for settings.json')

  await Main.openUri(otherUri)
  await Main.openUri(settingsUri)
  await expect(badge).toHaveText(' 2')
  await Main.closeActiveEditor()
  await expect(problemsView).toHaveText(otherProblemText)
  await expect(problemsView).toContainText('problem for other.js')
  await expect(badge).toHaveText(' 1')
}
