import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { getProblems } from '../src/parts/GetProblems/GetProblems.ts'

test('getProblems returns empty array', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const result = await getProblems('', 'file:///test.ts')
  expect(result).toEqual({
    error: '',
    problems: [],
  })
})

test('getProblems returns empty array for non-empty state', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const result = await getProblems('', 'file:///test.ts')
  expect(result).toEqual({ error: '', problems: [] })
})

test('getProblems only returns diagnostics for the active file', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [
      { message: 'one', uri: 'file:///one.ts' },
      { message: 'two', uri: 'file:///two.ts' },
    ],
  })
  const result = await getProblems('', 'file:///two.ts')
  expect(result.problems).toHaveLength(2)
  expect(result.problems.every((problem) => problem.uri === 'file:///two.ts')).toBe(true)
})

test('getProblems does not query diagnostics when there is no active file', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [{ message: 'one', uri: 'file:///one.ts' }],
  })
  await expect(getProblems('', '')).resolves.toEqual({ error: '', problems: [] })
  expect(mockRpc.invocations).toEqual([])
})

test('getProblems returns an error when querying diagnostics fails', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => {
      throw new Error('diagnostics failed')
    },
  })
  await expect(getProblems('', 'file:///test.ts')).resolves.toEqual({ error: 'Error: diagnostics failed', problems: [] })
})
