import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-sequence-many-changes'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  await Panel.open('Problems')
  const problemsView = Locator('.Viewlet.Problems')
  const uris = ['memfs:///workspace/1.ts', 'memfs:///workspace/2.ts', 'memfs:///workspace/3.ts', 'memfs:///workspace/4.ts', 'memfs:///workspace/5.ts']

  for (const uri of uris) {
    await Command.execute('Problems.handleActiveEditorChange', uri)
    await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  }
}
