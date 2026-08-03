import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.file-icon'

export const test: Test = async ({ BaseUrl, expect, Extension, FileSystem, IconTheme, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
  await Workspace.setPath(tmpDir)
  await Extension.addWebExtension(new URL('../fixtures/problems.one-problem', import.meta.url).toString())
  await Extension.addWebExtension(new URL('../fixtures/sample.icon-theme', import.meta.url).toString())
  await IconTheme.setIconTheme('test-icon-theme')

  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Panel.openProblems()

  const fileIcon = Locator('.Problem').nth(0).locator('.FileIcon')
  const baseUrl = BaseUrl.getBaseUrl()
  await expect(fileIcon).toBeVisible()
  await expect(fileIcon).toHaveAttribute('src', `${baseUrl}packages/extension-host-worker-tests/fixtures/sample.icon-theme/icons/default_file.svg`)
}
