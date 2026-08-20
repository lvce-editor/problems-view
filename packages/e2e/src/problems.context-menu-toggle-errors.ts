import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.context-menu-toggle-errors'

export const test: Test = async ({ ContextMenu, expect, Extension, FileSystem, Locator, Main, Panel, Problems, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(new URL('../fixtures/problems.one-problem', import.meta.url).toString())
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.openProblems()

  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(2)

  await Problems.handleContextMenu(0, 0)
  await ContextMenu.selectItem('Show Errors')
  await expect(problems).toHaveCount(0)

  await Problems.handleContextMenu(0, 0)
  await ContextMenu.selectItem('Show Errors')
  await expect(problems).toHaveCount(2)
}
