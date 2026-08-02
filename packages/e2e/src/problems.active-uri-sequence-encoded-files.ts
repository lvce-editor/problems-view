import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-sequence-encoded-files'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  await Panel.openProblems()
  const problemsView = Locator('.Viewlet.Problems')
  const uris = ['memfs:///workspace/a%20b.ts', 'memfs:///workspace/c%23d.ts']

  for (const uri of uris) {
    await Command.execute('Problems.handleActiveEditorChange', uri)
    await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  }
}
