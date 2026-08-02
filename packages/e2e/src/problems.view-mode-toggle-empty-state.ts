import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.view-mode-toggle-empty-state'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()

  await Problems.viewAsTable()
  await Problems.viewAsList()

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
