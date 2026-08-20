import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.related-location'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main, Panel, Problems, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const mainUri = `${tmpDir}/main.xyz`
  const typesUri = `${tmpDir}/types.xyz`
  await FileSystem.setFiles([
    { content: 'value', uri: mainUri },
    { content: 'first line\ntarget declaration', uri: typesUri },
  ])
  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve(`../fixtures/${name}`))
  await Main.openUri(mainUri)
  await Panel.openProblems()

  const problems = Locator('.Problem')
  const relatedLocation = problems.nth(2)
  await expect(problems).toHaveCount(3)
  await expect(relatedLocation).toContainText('The expected type is declared here')
  await expect(relatedLocation).toContainText('types.xyz')

  await Problems.handleClickAt(10, 638)

  await Editor.shouldHaveText('first line\ntarget declaration')
  await Editor.shouldHaveSelections(new Uint32Array([1, 0, 1, 0]))
}
