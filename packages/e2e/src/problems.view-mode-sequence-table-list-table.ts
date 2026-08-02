import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.view-mode-sequence-table-list-table'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.open('Problems')
  const viewModes = ['table', 'list', 'table']

  for (const viewMode of viewModes) {
    if (viewMode === 'list') {
      await Problems.viewAsList()
    } else {
      await Problems.viewAsTable()
    }
  }

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
