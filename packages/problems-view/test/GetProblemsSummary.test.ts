import { expect, test } from '@jest/globals'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { getProblemsSummary } from '../src/parts/GetProblemsSummary/GetProblemsSummary.ts'

test('returns an empty summary when there is no active editor', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => -1,
  })
  using editorRpc = EditorWorker.registerMockRpc({})
  await expect(getProblemsSummary()).resolves.toEqual({
    errorCount: 0,
    hasEditor: false,
    problemCount: 0,
    warningCount: 0,
  })
  expect(rendererRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(editorRpc.invocations).toEqual([])
})

test('returns the total problem count and active editor severity counts', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 7,
  })
  const duplicate = {
    code: '',
    columnIndex: 0,
    message: 'duplicate error',
    rowIndex: 0,
    source: 'typescript',
    type: 'error',
    uri: 'file:///active.ts',
  }
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.getDiagnostics': () => [
      duplicate,
      duplicate,
      { ...duplicate, message: 'warning', type: 'warning' },
      { ...duplicate, message: 'info', type: 'other' },
    ],
    'Editor.getProblems': () => [duplicate, duplicate, { ...duplicate, message: 'cross-file warning', type: 'warning', uri: 'file:///other.ts' }],
  })
  await expect(getProblemsSummary()).resolves.toEqual({
    errorCount: 1,
    hasEditor: true,
    problemCount: 2,
    warningCount: 1,
  })
  expect(rendererRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(editorRpc.invocations).toEqual([['Editor.getProblems'], ['Editor.getDiagnostics', 7]])
})
