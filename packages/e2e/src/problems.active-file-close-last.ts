import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-file-close-last'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Panel, Problems, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const fileUri = `${tmpDir}/file.txt`
  await FileSystem.writeFile(fileUri, 'content')
  await Workspace.setPath(tmpDir)
  await Main.openUri(fileUri)
  await Panel.openProblems()

  await Main.closeActiveEditor()
  await Problems.handleActiveEditorChange('')

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveAttribute('data-active-uri', '')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
