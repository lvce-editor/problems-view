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
    'GetActiveEditor.getVisibleEditorUris': () => ['file:///active.ts', 'file:///other.ts'],
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
    'Editor.getProblems': () => [
      duplicate,
      duplicate,
      { ...duplicate, message: 'visible cross-file warning', type: 'warning', uri: 'file:///other.ts' },
      { ...duplicate, message: 'hidden warning', type: 'warning', uri: 'file:///hidden.ts' },
    ],
  })
  await expect(getProblemsSummary()).resolves.toEqual({
    errorCount: 1,
    hasEditor: true,
    problemCount: 2,
    warningCount: 1,
  })
  expect(rendererRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId'], ['GetActiveEditor.getVisibleEditorUris']])
  expect(editorRpc.invocations).toEqual([['Editor.getProblems'], ['Editor.getDiagnostics', 7]])
})

test('returns the total problem count when the active editor was disposed', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 7,
    'GetActiveEditor.getVisibleEditorUris': () => ['file:///active.js'],
  })
  const problem = {
    code: '',
    columnIndex: 0,
    message: 'missing semicolon',
    rowIndex: 0,
    source: 'eslint',
    type: 'error',
    uri: 'file:///active.js',
  }
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.getDiagnostics': () => {
      throw new Error('editor 7 not found')
    },
    'Editor.getProblems': () => [problem],
  })
  await expect(getProblemsSummary()).resolves.toEqual({
    errorCount: 0,
    hasEditor: true,
    problemCount: 1,
    warningCount: 0,
  })
  expect(rendererRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId'], ['GetActiveEditor.getVisibleEditorUris']])
  expect(editorRpc.invocations).toEqual([['Editor.getProblems'], ['Editor.getDiagnostics', 7]])
})

test('includes the active uri supplied by the editor-change event', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 7,
    'GetActiveEditor.getVisibleEditorUris': () => [],
  })
  const diagnostic = {
    code: '',
    columnIndex: 0,
    message: 'active error',
    rowIndex: 0,
    source: 'typescript',
    type: 'error',
    uri: 'file:///active.ts',
  }
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.getDiagnostics': () => [diagnostic],
    'Editor.getProblems': () => [diagnostic],
  })

  await expect(getProblemsSummary('file:///active.ts')).resolves.toEqual({
    errorCount: 1,
    hasEditor: true,
    problemCount: 1,
    warningCount: 0,
  })
  expect(rendererRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId'], ['GetActiveEditor.getVisibleEditorUris']])
  expect(editorRpc.invocations).toEqual([['Editor.getProblems'], ['Editor.getDiagnostics', 7]])
})

test('keeps legacy problem counts when the visible editor rpc is unavailable', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 7,
    'GetActiveEditor.getVisibleEditorUris': () => {
      throw new Error('Command "GetActiveEditor.getVisibleEditorUris" not found (renderer worker)')
    },
  })
  const activeDiagnostic = {
    code: '',
    columnIndex: 0,
    message: 'visible error',
    rowIndex: 0,
    source: 'typescript',
    type: 'error',
    uri: 'file:///active.ts',
  }
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.getDiagnostics': () => [activeDiagnostic],
    'Editor.getProblems': () => [activeDiagnostic, { ...activeDiagnostic, message: 'hidden error', uri: 'file:///hidden.ts' }],
    'Editor.getUri': () => 'file:///active.ts',
  })

  await expect(getProblemsSummary()).resolves.toEqual({
    errorCount: 1,
    hasEditor: true,
    problemCount: 2,
    warningCount: 0,
  })
  expect(rendererRpc.invocations).toHaveLength(2)
  expect(rendererRpc.invocations).toEqual(expect.arrayContaining([['GetActiveEditor.getActiveEditorId'], ['GetActiveEditor.getVisibleEditorUris']]))
  expect(editorRpc.invocations).toHaveLength(2)
  expect(editorRpc.invocations).toEqual(expect.arrayContaining([['Editor.getProblems'], ['Editor.getDiagnostics', 7]]))
})
