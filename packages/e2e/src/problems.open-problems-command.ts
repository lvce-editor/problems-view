import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.open-problems-command'

export const test: Test = async ({ expect, Locator, Panel }) => {
  await Panel.openProblems()

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
