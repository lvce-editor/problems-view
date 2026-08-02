import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-trailing-slash'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  await Panel.openProblems()
  const uri = 'memfs:///workspace/folder/'

  await Command.execute('Problems.handleActiveEditorChange', uri)

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  await expect(problemsView).toBeVisible()
}
