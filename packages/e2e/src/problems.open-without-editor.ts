import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.open-without-editor'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Panel }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const fileUri = `${tmpDir}/file.txt`
  await FileSystem.writeFile(fileUri, 'content')
  await Main.openUri(fileUri)
  await Main.closeAllEditors()

  await Panel.openProblems()

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveAttribute('data-active-uri', '')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
