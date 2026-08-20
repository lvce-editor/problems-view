import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.error'

export const skip = 1

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve(`../fixtures/${name}`))
  await Main.openUri(`${tmpDir}/file1.xyz`)

  // act
  await Panel.openProblems()

  // assert
  const problemsView = Locator('.Problems')
  await expect(problemsView).toBeVisible()
  await expect(problemsView).toHaveText(`Error: Failed to execute diagnostic provider: TypeError: x is not a function`)
}
