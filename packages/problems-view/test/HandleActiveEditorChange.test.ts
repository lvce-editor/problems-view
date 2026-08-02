import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleActiveEditorChange, handleDiagnosticsChange } from '../src/parts/HandleActiveEditorChange/HandleActiveEditorChange.ts'

test('loads only diagnostics belonging to the newly active file', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [
      { message: 'stale', uri: 'file:///old.ts' },
      { message: 'active', uri: 'file:///new.ts' },
    ],
  })
  const result = await handleActiveEditorChange({ ...createDefaultState(), activeUri: 'file:///old.ts' }, 'file:///new.ts')
  expect(result.activeUri).toBe('file:///new.ts')
  expect(result.problems).toHaveLength(2)
  expect(result.problems.every((problem) => problem.uri === 'file:///new.ts')).toBe(true)
  expect(result.message).toBe('Some problems have been detected in the workspace.')
})

test('clears diagnostics when the last editor closes', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [{ message: 'stale', uri: 'file:///old.ts' }],
  })
  const oldState = {
    ...createDefaultState(),
    activeUri: 'file:///old.ts',
    problems: [{ uri: 'file:///old.ts' }] as any,
  }
  const result = await handleActiveEditorChange(oldState, '')
  expect(result.activeUri).toBe('')
  expect(result.problems).toEqual([])
  expect(result.filteredProblems).toEqual([])
  expect(result.message).toBe('No problems have been detected in the workspace.')
  expect(mockRpc.invocations).toEqual([])
})

test('does nothing when the active uri is unchanged', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state = { ...createDefaultState(), activeUri: 'file:///same.ts' }
  await expect(handleActiveEditorChange(state, 'file:///same.ts')).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('clears stale diagnostics when the new provider fails', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => {
      throw new Error('provider failed')
    },
  })
  const state = {
    ...createDefaultState(),
    activeUri: 'file:///old.ts',
    problems: [{ uri: 'file:///old.ts' }] as any,
  }
  const result = await handleActiveEditorChange(state, 'file:///new.ts')
  expect(result.activeUri).toBe('file:///new.ts')
  expect(result.problems).toEqual([])
  expect(result.message).toBe('Error: provider failed')
})

test('refreshes problems when diagnostics for the active uri change', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [{ message: 'updated', uri: 'file:///active.ts' }],
  })
  const state = {
    ...createDefaultState(),
    activeUri: 'file:///active.ts',
    problems: [{ message: 'stale', uri: 'file:///active.ts' }] as any,
  }

  const result = await handleDiagnosticsChange(state, 'file:///active.ts')

  expect(result).not.toBe(state)
  expect(result.problems).toHaveLength(2)
  expect(result.problems.every((problem) => problem.uri === 'file:///active.ts')).toBe(true)
  expect(result.problems[1].message).toBe('updated')
  expect(mockRpc.invocations).toEqual([['Editor.getProblems']])
})

test('ignores diagnostics changes for an inactive uri', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state = { ...createDefaultState(), activeUri: 'file:///active.ts' }

  await expect(handleDiagnosticsChange(state, 'file:///inactive.ts')).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([])
})
