import { expect, test } from '@jest/globals'
import { getIndentRule } from '../src/parts/GetIndentRule/GetIndentRule.ts'

test('getIndentRule returns a class with matching padding', () => {
  expect(getIndentRule('2rem')).toBe(`.Indent-2rem {
  padding-left: 2rem;
}`)
})
