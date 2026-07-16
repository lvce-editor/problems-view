import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.accessibility'

export const test: Test = async ({ expect, Locator, Panel }) => {
  // act
  await Panel.open('Problems')

  // assert
  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveAttribute('tabindex', '0')

  const message = problemsView.locator('.Message')
  await expect(message).toBeVisible()
  await expect(message).toHaveText('No problems have been detected in the workspace.')
}
