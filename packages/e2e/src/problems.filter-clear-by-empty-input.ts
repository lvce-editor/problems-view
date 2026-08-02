import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-clear-by-empty-input'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  await Problems.handleFilterInput('missing')

  await Problems.handleFilterInput('')

  const input = Locator('.Panel .InputBox')
  await expect(input).toHaveValue('')
  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
