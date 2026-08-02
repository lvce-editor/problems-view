import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.active-uri-http-scheme'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  await Panel.open('Problems')
  const uri = 'http://localhost/source.ts'

  await Command.execute('Problems.handleActiveEditorChange', uri)

  const problemsView = Locator('.Viewlet.Problems')
  await expect(problemsView).toHaveAttribute('data-active-uri', uri)
  await expect(problemsView).toBeVisible()
}
