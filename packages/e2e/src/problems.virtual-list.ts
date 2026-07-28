import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.virtual-list'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const fileUri = `${tmpDir}/file.xyz`
  await FileSystem.writeFile(fileUri, 'content')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(new URL('../fixtures/problems.many-problems', import.meta.url).toString())
  await Main.openUri(fileUri)
  await Panel.open('Problems')

  const problemsView = Locator('.Viewlet.Problems')
  const problemsList = problemsView.locator('.ProblemsList')
  const problems = problemsList.locator('.Problem')
  const scrollBar = problemsView.locator('.ScrollBar')
  const firstProblem = Locator('.Problem', { hasText: 'problem 0' })
  const laterProblem = Locator('.Problem', { hasText: 'problem 80' })

  await expect(problemsView).toBeVisible()
  await expect(scrollBar).toBeVisible()
  await expect(problems).not.toHaveCount(101)
  await expect(firstProblem).toBeVisible()

  await problemsList.dispatchEvent('wheel', {
    bubbles: true,
    deltaMode: 0,
    deltaY: 1800,
  } as unknown as string)

  await expect(firstProblem).toBeHidden()
  await expect(laterProblem).toBeVisible()
}
