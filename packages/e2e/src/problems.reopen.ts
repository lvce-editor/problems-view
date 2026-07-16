import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.reopen'

export const test: Test = async ({ expect, Locator, Output, Panel }) => {
  // arrange
  await Panel.open('Problems')
  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()

  // act
  await Output.show()

  // assert
  await expect(problemsView).toBeHidden()

  // act
  await Panel.openProblems()

  // assert
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
