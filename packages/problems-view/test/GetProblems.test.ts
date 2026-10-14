import { expect, test } from '@jest/globals'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { getProblems } from '../src/parts/GetProblems/GetProblems.ts'

test('getProblems returns empty array', async () => {
  RendererWorker.registerMockRpc({ 'GetActiveEditor.getVisibleEditorUris': () => ['file:///test.ts'] })
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const result = await getProblems('file:///test.ts')
  expect(result).toEqual({
    error: '',
    problems: [],
  })
})

test('getProblems returns empty array for non-empty state', async () => {
  RendererWorker.registerMockRpc({ 'GetActiveEditor.getVisibleEditorUris': () => ['file:///test.ts'] })
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const result = await getProblems('file:///test.ts')
  expect(result).toEqual({ error: '', problems: [] })
})

test('getProblems returns cross-file diagnostics while a file is active', async () => {
  RendererWorker.registerMockRpc({ 'GetActiveEditor.getVisibleEditorUris': () => ['file:///one.ts', 'file:///two.ts'] })
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [
      { message: 'one', uri: 'file:///one.ts' },
      { message: 'two', uri: 'file:///two.ts' },
    ],
  })
  const result = await getProblems('file:///two.ts')
  expect(result.problems).toHaveLength(4)
  expect(new Set(result.problems.map((problem) => problem.uri))).toEqual(new Set(['file:///one.ts', 'file:///two.ts']))
})

test('getProblems removes duplicate diagnostics from multiple open editors', async () => {
  const diagnostic = {
    code: '',
    columnIndex: 0,
    message: 'Invalid config',
    rowIndex: 1,
    source: 'eslint',
    type: 'error',
    uri: 'file:///eslint.config.js',
  }
  RendererWorker.registerMockRpc({ 'GetActiveEditor.getVisibleEditorUris': () => [diagnostic.uri] })
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [diagnostic, diagnostic],
  })
  const result = await getProblems('file:///source.ts')
  expect(result.problems).toHaveLength(2)
  expect(result.problems.every((problem) => problem.uri === diagnostic.uri)).toBe(true)
})

test('getProblems filters diagnostics from cached editors that are not visible', async () => {
  RendererWorker.registerMockRpc({ 'GetActiveEditor.getVisibleEditorUris': () => ['file:///settings.json'] })
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [
      { message: 'hidden TypeScript problem', uri: 'file:///geometry.ts' },
      { message: 'visible JSON problem', uri: 'file:///settings.json' },
    ],
  })

  const result = await getProblems('file:///settings.json')

  expect(new Set(result.problems.map((problem) => problem.uri))).toEqual(new Set(['file:///settings.json']))
  expect(result.problems.some((problem) => problem.message === 'hidden TypeScript problem')).toBe(false)
})

test('getProblems does not query diagnostics when there is no active file', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [{ message: 'one', uri: 'file:///one.ts' }],
  })
  await expect(getProblems('')).resolves.toEqual({ error: '', problems: [] })
  expect(mockRpc.invocations).toEqual([])
})

test('getProblems returns an error when querying diagnostics fails', async () => {
  RendererWorker.registerMockRpc({ 'GetActiveEditor.getVisibleEditorUris': () => ['file:///test.ts'] })
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => {
      throw new Error('diagnostics failed')
    },
  })
  await expect(getProblems('file:///test.ts')).resolves.toEqual({ error: 'Error: diagnostics failed', problems: [] })
})
