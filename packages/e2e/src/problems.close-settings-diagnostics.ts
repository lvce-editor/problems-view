import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.close-settings-diagnostics'
export const skip = 1

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Settings, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const settingsUri = `${tmpDir}/settings.json`
  const otherUri = `${tmpDir}/other.js`
  await FileSystem.setFiles([
    { content: '{ "valid": true }', uri: settingsUri },
    { content: 'const value = true', uri: otherUri },
  ])
  await Workspace.setPath(tmpDir)
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.settings-diagnostics'))
  await Extension.disableWorkspace('test.settings-diagnostics')
  await Settings.update({ 'editor.diagnostics': true })
  await Main.openUri(settingsUri)
  await Main.openUri(otherUri)
  await Panel.openProblems()

  const problemsView = Locator('.Problems')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')

  await Extension.enableWorkspace('test.settings-diagnostics')
  await expect(problemsView).toContainText('problem for settings.json')
  await expect(problemsView).toContainText('problem for other.js')

  await Locator('.MainTab').nth(0).locator('.EditorTabCloseButton').click()

  await expect(problemsView).not.toContainText('settings.json')
  await expect(problemsView).toContainText('problem for other.js')

  await Main.closeActiveEditor()
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')

  await Main.openUri(settingsUri)
  await expect(problemsView).toContainText('problem for settings.json')
}
