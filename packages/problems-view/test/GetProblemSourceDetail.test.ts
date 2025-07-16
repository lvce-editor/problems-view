import { test, expect } from '@jest/globals'
import { getProblemSourceDetail } from '../src/parts/GetProblemSourceDetail/GetProblemSourceDetail.ts'

test('getProblemSourceDetail with both source and code', () => {
  expect(getProblemSourceDetail('eslint', 'no-unused-vars')).toBe('eslint(no-unused-vars) ')
  expect(getProblemSourceDetail('ts', 123)).toBe('ts(123) ')
})

test('getProblemSourceDetail with only source', () => {
  expect(getProblemSourceDetail('eslint', '')).toBe('eslint ')
  expect(getProblemSourceDetail('ts', '' as any)).toBe('ts ')
})

test('getProblemSourceDetail with only code', () => {
  expect(getProblemSourceDetail('', 'no-unused-vars')).toBe('(no-unused-vars) ')
  expect(getProblemSourceDetail('', 123)).toBe('(123) ')
})

test('getProblemSourceDetail with neither source nor code', () => {
  expect(getProblemSourceDetail('', '')).toBe(' ')
  expect(getProblemSourceDetail('', '' as any)).toBe(' ')
})