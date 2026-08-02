import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-sequence-three-files'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  await Panel.open('Problems')
  const problemsView = Locator('.Viewlet.Problems')
  const uris = ['memfs:///workspace/one.ts', 'memfs:///workspace/two.ts', 'memfs:///workspace/three.ts']

  for (const uri of uris) {
    await Command.execute('Problems.handleActiveEditorChange', uri)
    await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  }
}
