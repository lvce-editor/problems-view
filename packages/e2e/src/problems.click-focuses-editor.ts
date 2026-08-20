import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.click-focuses-editor'

const waitFor = async (assertion: () => Promise<void>): Promise<void> => {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      await assertion()
      return
    } catch (error) {
      if (attempt === 99) {
        throw error
      }
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  }
}

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main, Panel, Problems, Workspace }) => {
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
  await Problems.handleClickAt(10, 616)

  const cursor = Locator('.EditorCursor')
  await expect(cursor).toBeVisible()
  await waitFor(() => expect(cursor).toHaveCSS('translate', '0px 20px'))
  const editorInput = Locator('[name="editor"]')
  await waitFor(() => expect(editorInput).toBeFocused())
}
