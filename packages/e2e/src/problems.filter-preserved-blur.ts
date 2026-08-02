import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-preserved-blur'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.open('Problems')
  await Problems.handleFilterInput('keep me')

  await Problems.handleBlur()

  const input = Locator('.Panel .InputBox')
  await expect(input).toHaveValue('keep me')
}
