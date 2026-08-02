import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-file-close-selects-neighbor'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Panel, Problems, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const firstUri = `${tmpDir}/first.txt`
  const secondUri = `${tmpDir}/second.txt`
  await FileSystem.setFiles([
    { content: 'first', uri: firstUri },
    { content: 'second', uri: secondUri },
  ])
  await Workspace.setPath(tmpDir)
  await Main.openUri(firstUri)
  await Main.openUri(secondUri)
  await Panel.openProblems()

  await Main.closeActiveEditor()
  await Problems.handleActiveEditorChange(firstUri)

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveAttribute('data-active-uri', firstUri)
}
