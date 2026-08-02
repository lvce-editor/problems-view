import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-encoded-hash'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  const uri = 'memfs:///workspace/file-%23-name.ts'

  await Problems.handleActiveEditorChange(uri)

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  await expect(problemsView).toBeVisible()
}
