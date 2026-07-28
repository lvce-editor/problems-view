import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.icon-theme-change-empty-state'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.open('Problems')

  await Problems.handleIconThemeChange()

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
