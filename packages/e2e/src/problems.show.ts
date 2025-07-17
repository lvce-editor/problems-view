import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.show'

export const skip = 1

export const test: Test = async ({ Panel, Locator, expect }) => {
  // arrange
  // act
  await Panel.open('Problems')

  // assert
  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText(`No problems have been detected in the workspace.`)
}
