import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-encoded-space'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  const uri = 'memfs:///workspace/folder%20with%20spaces/main.ts'

  await Problems.handleActiveEditorChange(uri)

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
  await expect(problemsView).toBeVisible()
}
