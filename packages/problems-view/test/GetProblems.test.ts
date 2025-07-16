import { test, expect } from '@jest/globals'
import { getProblems } from '../src/parts/GetProblems/GetProblems.ts'

test('getProblems returns empty array', async () => {
  const result = await getProblems({})
  expect(result).toEqual([])
})

test('getProblems returns empty array for non-empty state', async () => {
  const result = await getProblems({ foo: 'bar' })
  expect(result).toEqual([])
})