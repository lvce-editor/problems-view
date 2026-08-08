import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.click-focuses-editor'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const fileUri = `${tmpDir}/file1.xyz`
  await FileSystem.writeFile(fileUri, 'first line\nsecond line')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(new URL(`../fixtures/${name}`, import.meta.url).toString())
  await Main.openUri(fileUri)
  await Editor.setCursor(0, 0)
  await Panel.openProblems()

  const problems = Locator('.Problem')
  await expect(problems).toHaveCount(2)
  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered problem row's pointer handler.
  await problems.nth(1).click()

  await Editor.shouldHaveSelections(new Uint32Array([1, 3, 1, 3]))
  const editorInput = Locator('[name="editor"]')
  await expect(editorInput).toBeFocused()
}
