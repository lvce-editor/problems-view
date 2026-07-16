import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.handle-click-empty-state'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  // arrange
  await Panel.open('Problems')
  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()

  // act
  await Problems.handleClickAt(10, 10)

  // assert
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
