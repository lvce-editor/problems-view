import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-encoded-brackets'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  await Panel.openProblems()
  // cspell:disable-next-line
  const uri = 'memfs:///workspace/file-%5Btest%5D.ts'

  await Command.execute('Problems.handleActiveEditorChange', uri)

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  await expect(problemsView).toBeVisible()
}
