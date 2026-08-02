import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-sequence-same-uri'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.openProblems()
  const problemsView = Locator('.Viewlet.Problems')
  const uris = ['memfs:///workspace/same.ts', 'memfs:///workspace/same.ts']

  for (const uri of uris) {
    await Problems.handleActiveEditorChange(uri)
    await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  }
}
