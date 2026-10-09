import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.click-table-keeps-focus'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main, Panel, Problems, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const uri = `${tmpDir}/file1.xyz`
  await FileSystem.writeFile(uri, 'first line\nsecond line')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.click-focuses-editor'))
  await Main.openUri(uri)
  await Panel.openProblems()
  await Problems.viewAsTable()
  const row = Locator('.ProblemsTableBody .ProblemsTableRow')
  // eslint-disable-next-line e2e/no-direct-click -- Verify native focus on a rendered table row.
  await row.click()
  await expect(row).toBeFocused()
  await Editor.shouldHaveSelections(new Uint32Array([1, 0, 1, 0]))
  const highlighted = Locator('.EditorProblemsHighlightedRow')
  await expect(highlighted).toHaveText('second line')
}
