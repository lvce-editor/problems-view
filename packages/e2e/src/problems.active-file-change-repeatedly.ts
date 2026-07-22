import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-file-change-repeatedly'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Main, Panel, Workspace }) => {
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
  await Panel.open('Problems')
  const problemsView = Locator('.Viewlet.Problems')

  await Command.execute('Problems.handleActiveEditorChange', firstUri)
  await expect(problemsView).toHaveAttribute('data-active-uri', firstUri)
  await Command.execute('Problems.handleActiveEditorChange', secondUri)
  await expect(problemsView).toHaveAttribute('data-active-uri', secondUri)
  await Command.execute('Problems.handleActiveEditorChange', thirdUri)
  await expect(problemsView).toHaveAttribute('data-active-uri', thirdUri)
}
