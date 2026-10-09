import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-file-change-repeatedly'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Panel, Problems, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const firstUri = `${tmpDir}/first.txt`
  const secondUri = `${tmpDir}/second.txt`
  const thirdUri = `${tmpDir}/third.txt`
  await FileSystem.setFiles([
    { content: 'first', uri: firstUri },
    { content: 'second', uri: secondUri },
    { content: 'third', uri: thirdUri },
  ])
  await Workspace.setPath(tmpDir)
  await Main.openUri(firstUri)
  await Main.openUri(secondUri)
  await Main.openUri(thirdUri)
  await Panel.openProblems()
  const problemsView = Locator('.Viewlet.Problems')

  await Problems.handleActiveEditorChange(firstUri)
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
  await Problems.handleActiveEditorChange(secondUri)
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
  await Problems.handleActiveEditorChange(thirdUri)
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
