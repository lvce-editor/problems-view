import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.empty-workspace'

export const test: Test = async ({ expect, FileSystem, Locator, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  await Panel.openProblems()

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveAttribute('data-active-uri', '')
  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
}
