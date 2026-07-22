import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-file-filter-preserved'

// The static e2e export consumes the latest published Problems package.
// Remove after publishing the active-file command from this change.
export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Locator, Main, Panel, Problems, Workspace }) => {
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
  await Panel.open('Problems')
  await Problems.handleFilterInput('second.txt')

  await Command.execute('Viewlet.executeViewletCommand', 'Problems', 'handleActiveEditorChange', firstUri)

  const filterInput = Locator('.Panel .InputBox')
  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveAttribute('data-active-uri', firstUri)
  await expect(filterInput).toHaveValue('second.txt')
}
