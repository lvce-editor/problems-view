import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-then-reopen'

export const test: Test = async ({ expect, Locator, Output, Panel, Problems }) => {
  await Panel.openProblems()
  await Problems.handleFilterInput('keep me')
  const problemsView = Locator('.Viewlet.Problems')

  await Output.show()
  await expect(problemsView).toBeHidden()
  await Panel.openProblems()

  await expect(problemsView).toBeVisible()
}
