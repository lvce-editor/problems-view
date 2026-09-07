import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-untitled-scheme'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  const uri = 'untitled:Untitled-1'

  await Problems.handleActiveEditorChange(uri)

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
  await expect(problemsView).toBeVisible()
}
