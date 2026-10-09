import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.workspace-change-clears-stale-problems'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const oldWorkspace = `${tmpDir}/old-workspace`
  const newWorkspace = `${tmpDir}/new-workspace`
  const oldFile = `${oldWorkspace}/file.xyz`
  await FileSystem.setFiles([
    { content: 'old workspace', uri: oldFile },
    { content: 'new workspace', uri: `${newWorkspace}/file.txt` },
  ])
  await Workspace.setPath(oldWorkspace)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve(`../fixtures/problems.one-problem`))
  await Main.openUri(oldFile)
  await Panel.openProblems()

  const problems = Locator('.Problem')
  const problemsView = Locator('.Viewlet.Problems')
  await expect(problems).toHaveCount(2)

  await Workspace.setPath(newWorkspace)

  await expect(problemsView).toHaveText('No problems have been detected in the workspace.')
  await expect(problems).toHaveCount(0)
}
