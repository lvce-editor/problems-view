import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.click-keeps-focus'

export const test: Test = async ({ Command, Editor, expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const fileUri = `${tmpDir}/file1.xyz`
  const otherUri = `${tmpDir}/other.txt`
  await FileSystem.setFiles([
    { content: 'first line\nsecond line', uri: fileUri },
    { content: 'other editor', uri: otherUri },
  ])
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.click-focuses-editor'))
  await Main.openUri(fileUri)
  await Main.openUri(otherUri)
  await Panel.openProblems()

  const problem = Locator('.Problem').nth(1)
  const highlighted = Locator('.EditorProblemsHighlightedRow')
  // eslint-disable-next-line e2e/no-direct-click -- Exercise native row focus and the rendered pointer handler.
  await problem.click()
  await expect(problem).toBeFocused()
  await expect(problem).toHaveAttribute('aria-selected', 'true')
  await Editor.shouldHaveText('first line\nsecond line')
  await expect(highlighted).toHaveText('second line')
  await expect(highlighted).toBeVisible()
  // eslint-disable-next-line e2e/no-direct-click -- Repeated clicks must preserve row focus too.
  await problem.click()
  await expect(problem).toBeFocused()
  await expect(highlighted).toHaveCount(1)
  await Command.execute('Main.focus')
  await expect(highlighted).toHaveCount(0)
}
