import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.copy-message-no-focus'

export const test: Test = async ({ ClipBoard, expect, Locator, Panel, Problems }) => {
  await ClipBoard.enableMemoryClipBoard()
  await ClipBoard.writeText('Existing clipboard text')
  await Panel.openProblems()
  await Problems.focusIndex(-1)

  await Problems.copyMessage()

  await ClipBoard.shouldHaveText('Existing clipboard text')
  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
