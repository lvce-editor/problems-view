import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.open-repeatedly'

export const test: Test = async ({ expect, Locator, Panel }) => {
  await Panel.open('Problems')
  await Panel.open('Problems')
  await Panel.openProblems()

  const problemsViews = Locator('.Viewlet.Problems')
  await expect(problemsViews).toHaveCount(1)
  await expect(problemsViews).toBeVisible()
}
