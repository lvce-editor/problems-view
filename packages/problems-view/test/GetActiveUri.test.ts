import { expect, test } from '@jest/globals'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { getActiveUri } from '../src/parts/GetActiveUri/GetActiveUri.ts'

test('returns the active editor uri', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 42,
  })
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.getUri': () => 'file:///active.ts',
  })
  await expect(getActiveUri()).resolves.toBe('file:///active.ts')
  expect(rendererRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(editorRpc.invocations).toEqual([['Editor.getUri', 42]])
})

test('returns an empty uri when there is no active editor', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => -1,
  })
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.getUri': () => 'file:///stale.ts',
  })
  await expect(getActiveUri()).resolves.toBe('')
  expect(rendererRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(editorRpc.invocations).toEqual([])
})
