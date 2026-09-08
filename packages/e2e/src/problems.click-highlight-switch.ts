import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.click-highlight-switch'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const uri = `${tmpDir}/file1.xyz`
  await FileSystem.writeFile(uri, 'first line\nerror line\nwarning line')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve(`../fixtures/${name}`))
  await Main.openUri(uri)
  await Panel.openProblems()
  const rows = Locator('.Problem')
  await expect(rows).toHaveCount(3)
  const error = rows.nth(1)
  const warning = rows.nth(2)
  const highlighted = Locator('.EditorProblemsHighlightedRow')
  // eslint-disable-next-line e2e/no-direct-click -- Exercise diagnostic row click and focus rendering.
  await error.click()
  await expect(error).toBeFocused()
  await expect(highlighted).toHaveText('error line')
  // eslint-disable-next-line e2e/no-direct-click -- Verify switching severity replaces the highlight and focuses the warning row.
  await warning.click()
  await expect(warning).toBeFocused()
  await expect(highlighted).toHaveCount(1)
  await expect(highlighted).toHaveText('warning line')
}
