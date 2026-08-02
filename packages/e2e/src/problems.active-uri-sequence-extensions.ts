import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-sequence-extensions'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  await Panel.open('Problems')
  const problemsView = Locator('.Viewlet.Problems')
  const uris = ['memfs:///workspace/main.js', 'memfs:///workspace/main.ts', 'memfs:///workspace/main.py']

  for (const uri of uris) {
    await Command.execute('Problems.handleActiveEditorChange', uri)
    await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  }
}
