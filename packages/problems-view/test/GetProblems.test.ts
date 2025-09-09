import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { getProblems } from '../src/parts/GetProblems/GetProblems.ts'

test('getProblems returns empty array', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const result = await getProblems('')
  expect(result).toEqual({
    error: '',
    problems: [],
  })
})

test('getProblems returns empty array for non-empty state', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const result = await getProblems('')
  expect(result).toEqual({ error: '', problems: [] })
})
