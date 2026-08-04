import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filename-toggle'

const waitFor = async (assertion: () => Promise<void>, attempts = 100): Promise<void> => {
  try {
    await assertion()
  } catch (error) {
    if (attempts <= 1) {
      throw error
    }
    await new Promise((resolve) => setTimeout(resolve, 10))
    await waitFor(assertion, attempts - 1)
  }
}

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main, Panel, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')

  await Workspace.setPath(tmpDir)
  // @ts-ignore
  await Extension.addWebExtension(new URL('../fixtures/problems.one-problem', import.meta.url).toString())

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
  await waitFor(() => expect(problems).toHaveCount(1))

  // eslint-disable-next-line e2e/no-direct-click -- This regression test must exercise the rendered filename action instead of its command API.
  await fileName.click()
  await waitFor(() => expect(problems).toHaveCount(2))
}
