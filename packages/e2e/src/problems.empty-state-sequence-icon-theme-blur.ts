import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.empty-state-sequence-icon-theme-blur'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  const actions = ['icon-theme', 'blur']

  const runAction = async (action: string): Promise<void> => {
    switch (action) {
      case 'blur':
        await Problems.handleBlur()
        break
      case 'click':
        await Problems.handleClickAt(10, 10)
        break
      case 'focus':
        await Problems.focusIndex(-1)
        break
      case 'icon-theme':
        await Problems.handleIconThemeChange()
        break
      case 'list':
        await Problems.viewAsList()
        break
      default:
        await Problems.viewAsTable()
        break
    }
  }

  for (const action of actions) {
    await runAction(action)
  }

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
