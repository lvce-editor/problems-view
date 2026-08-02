import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.focus-boundary-focus-negative-thousand'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.open('Problems')

  await Problems.focusIndex(-1000)

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
