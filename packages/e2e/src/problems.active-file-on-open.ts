import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-file-on-open'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const fileUri = `${tmpDir}/file.txt`
  await FileSystem.writeFile(fileUri, 'content')
  await Workspace.setPath(tmpDir)
  await Main.openUri(fileUri)

  await Panel.openProblems()

  const problemsView = Locator('.Viewlet.Problems')
  const problemsViewWithActiveUri = Locator('.Viewlet.Problems[data-active-uri]')
  await expect(problemsViewWithActiveUri).toHaveCount(0)
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
