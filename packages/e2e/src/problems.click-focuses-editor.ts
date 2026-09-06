import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.click-focuses-editor'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main, Panel, Problems, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const fileUri = `${tmpDir}/file1.xyz`
  await FileSystem.writeFile(fileUri, 'first line\nsecond line')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve(`../fixtures/${name}`))
  await Main.openUri(fileUri)
  await Editor.setCursor(0, 0)
  await Panel.openProblems()

  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(2)
  await Problems.handleClickAt(10, 616)

  const cursor = Locator('.EditorCursor')
  await expect(cursor).toBeVisible()
  await expect(cursor).toHaveCSS('translate', '0px 20px')
  const editorInput = Locator('[name="editor"]')
  await expect(editorInput).toBeFocused()
}
