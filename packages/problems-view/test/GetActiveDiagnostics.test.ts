import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { Diagnostic } from '../src/parts/Diagnostic/Diagnostic.ts'
import { getActiveDiagnostics } from '../src/parts/GetActiveDiagnostics/GetActiveDiagnostics.ts'

test('returns diagnostics for the requested editor', async () => {
  const diagnostics: readonly Diagnostic[] = [
    {
      code: '',
      columnIndex: 0,
      listItemType: 0,
      message: 'missing semicolon',
      rowIndex: 0,
      source: 'eslint',
      type: 'error',
      uri: 'file:///active.js',
    },
  ]
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.getDiagnostics': () => diagnostics,
  })

  await expect(getActiveDiagnostics(7)).resolves.toEqual(diagnostics)
  expect(editorRpc.invocations).toEqual([['Editor.getDiagnostics', 7]])
})

test('returns an empty array when the editor has no diagnostics', async () => {
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.getDiagnostics': () => [],
  })

  await expect(getActiveDiagnostics(0)).resolves.toEqual([])
  expect(editorRpc.invocations).toEqual([['Editor.getDiagnostics', 0]])
})

test('returns an empty array when retrieving diagnostics fails', async () => {
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.getDiagnostics': async () => {
      throw new Error('editor 7 not found')
    },
  })

  await expect(getActiveDiagnostics(7)).resolves.toEqual([])
  expect(editorRpc.invocations).toEqual([['Editor.getDiagnostics', 7]])
})
