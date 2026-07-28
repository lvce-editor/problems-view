import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-file-special-characters'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  const fileUri = 'memfs:///workspace/folder with spaces/file-%23.txt'
  await Panel.open('Problems')

  await Command.execute('Problems.handleActiveEditorChange', fileUri)

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveAttribute('data-active-uri', fileUri)
}
