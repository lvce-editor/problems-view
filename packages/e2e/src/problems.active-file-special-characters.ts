import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-file-special-characters'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  const fileUri = 'memfs:///workspace/folder with spaces/file-%23.txt'
  await Panel.openProblems()

  await Problems.handleActiveEditorChange(fileUri)

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveAttribute('data-active-uri', fileUri)
}
