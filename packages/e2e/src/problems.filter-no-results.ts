import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-no-results'

export const skip = 1

export const test: Test = async ({ Panel, Locator, expect, Command }) => {
  // arrange
  await Panel.open('Problems')
  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText(`No problems have been detected in the workspace.`)
  const input = Locator('.Panel .InputBox')
  await expect(input).toBeVisible()

  // act
  await Command.execute('Problems.handleFilterInput', 'abc')

  // assert
  await expect(problemsView).toHaveText(`No results found with provided filter criteria.Clear Filters.`)
}
