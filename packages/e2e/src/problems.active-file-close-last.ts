import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-file-close-last'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const fileUri = `${tmpDir}/file.txt`
  await FileSystem.writeFile(fileUri, 'content')
  await Workspace.setPath(tmpDir)
  await Main.openUri(fileUri)
  await Panel.open('Problems')

  await Main.closeActiveEditor()
  await Command.execute('Problems.handleActiveEditorChange', '')

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveAttribute('data-active-uri', '')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
