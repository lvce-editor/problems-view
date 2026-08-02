import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-sequence-return-to-first'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  await Panel.openProblems()
  const problemsView = Locator('.Viewlet.Problems')
  const uris = ['memfs:///workspace/first.ts', 'memfs:///workspace/second.ts', 'memfs:///workspace/first.ts']

  for (const uri of uris) {
    await Command.execute('Problems.handleActiveEditorChange', uri)
    await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  }
}
