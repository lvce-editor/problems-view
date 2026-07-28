import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'problems.filter-unicode'

export const test: Test = async ({ expect, Locator, Panel, Problems }) => {
  await Panel.open('Problems')

  await Problems.handleFilterInput('文件🙂')

  const input = Locator('.Panel .InputBox')
  await expect(input).toHaveValue('文件🙂')
}
