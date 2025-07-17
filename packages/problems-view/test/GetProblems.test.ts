import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { getProblems } from '../src/parts/GetProblems/GetProblems.ts'

test('getProblems returns empty array', async () => {
  const invoke = jest.fn((...args: readonly any[]) => [])
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  EditorWorker.set(mockRpc)
  const result = await getProblems({})
  expect(result).toEqual({
    error: '',
    problems: [],
  })
})

test('getProblems returns empty array for non-empty state', async () => {
  const invoke = jest.fn((...args: readonly any[]) => [])
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  EditorWorker.set(mockRpc)
  const result = await getProblems({ foo: 'bar' })
  expect(result).toEqual({ error: '', problems: [] })
})
