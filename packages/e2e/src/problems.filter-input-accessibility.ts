import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-input-accessibility'

export const test: Test = async ({ expect, Locator, Panel }) => {
  await Panel.open('Problems')

  const input = Locator('.Panel .InputBox')
  await expect(input).toBeVisible()
  await expect(input).toHaveAttribute('name', 'filter')
  await expect(input).toHaveAttribute('placeholder', 'Filter')
  await expect(input).toHaveAttribute('spellcheck', 'false')
  await expect(input).toHaveAttribute('autocapitalize', 'off')
}
