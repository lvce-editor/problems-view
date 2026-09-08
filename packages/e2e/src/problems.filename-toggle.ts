import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filename-toggle'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')

  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(import.meta.resolve('../fixtures/problems.one-problem'))

  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.openProblems()

  const problems = Locator('.Problem')
  const fileGroup = problems.nth(0)
  const fileName = fileGroup.locator('.Label')
  await expect(problems).toHaveCount(2)
  await expect(fileGroup).toHaveAttribute('aria-expanded', 'true')
  await expect(fileName).toHaveAttribute('data-uri', `${tmpDir}/file1.xyz`)

  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered filename action instead of its command API.
  await fileName.click()
  await expect(problems).toHaveCount(1)
  await expect(fileGroup).toBeFocused()
  await expect(fileGroup).toHaveAttribute('aria-expanded', 'false')

  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered filename action instead of its command API.
  await fileGroup.click()
  await expect(problems).toHaveCount(2)
  await expect(fileGroup).toBeFocused()
  await expect(fileGroup).toHaveAttribute('aria-expanded', 'true')
}
