import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-sequence-nested-folders'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  await Panel.openProblems()
  const problemsView = Locator('.Viewlet.Problems')
  const uris = ['memfs:///workspace/a/one.ts', 'memfs:///workspace/b/two.ts', 'memfs:///workspace/c/three.ts']

  for (const uri of uris) {
    await Command.execute('Problems.handleActiveEditorChange', uri)
    await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  }
}
