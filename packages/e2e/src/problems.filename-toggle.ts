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

  // The click helper emits mouse events only. Include pointerdown at the first row, as a browser does.
  await fileName.dispatchEvent('pointerdown', { bubbles: true, clientX: 10, clientY: 594 } as any)
  // eslint-disable-next-line e2e/no-direct-click -- Complete the click sequence to catch duplicate filename toggles.
  await fileName.click()
  await expect(problems).toHaveCount(1)
  await expect(fileGroup).toBeFocused()
  await expect(fileGroup).toHaveAttribute('aria-expanded', 'false')
  await expect(fileGroup.locator('.MaskIconChevronRight')).toBeVisible()

  // The click helper emits mouse events only. Include pointerdown at the first row, as a browser does.
  await fileName.dispatchEvent('pointerdown', { bubbles: true, clientX: 10, clientY: 594 } as any)
  // eslint-disable-next-line e2e/no-direct-click -- Complete the click sequence to catch duplicate filename toggles.
  await fileName.click()
  await expect(problems).toHaveCount(2)
  await expect(fileGroup).toBeFocused()
  await expect(fileGroup).toHaveAttribute('aria-expanded', 'true')

  await fileGroup.locator('.Chevron').dispatchEvent('pointerdown', { bubbles: true, clientX: 10, clientY: 594 } as any)
  // eslint-disable-next-line e2e/no-direct-click -- Complete the click sequence on the chevron.
  await fileGroup.locator('.Chevron').click()
  await expect(problems).toHaveCount(1)
  await expect(fileGroup).toBeFocused()
  await expect(fileGroup).toHaveAttribute('aria-expanded', 'false')

  await fileGroup.locator('.ProblemBadge').dispatchEvent('pointerdown', { bubbles: true, clientX: 10, clientY: 594 } as any)
  // eslint-disable-next-line e2e/no-direct-click -- Complete the click sequence outside the filename.
  await fileGroup.locator('.ProblemBadge').click()
  await expect(problems).toHaveCount(2)
  await expect(fileGroup).toBeFocused()
  await expect(fileGroup).toHaveAttribute('aria-expanded', 'true')
  await expect(fileGroup.locator('.MaskIconChevronDown')).toBeVisible()
}
