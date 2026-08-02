import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-sequence-unicode-files'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  const problemsView = Locator('.Viewlet.Problems')
  const uris = ['memfs:///workspace/一.ts', 'memfs:///workspace/二.ts', 'memfs:///workspace/三.ts']

  for (const uri of uris) {
    await Problems.handleActiveEditorChange(uri)
    await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  }
}
