import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.focus-boundary-focus-none'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()

  await Problems.focusIndex(-1)

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
