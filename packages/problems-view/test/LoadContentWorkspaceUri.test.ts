import { expect, test } from '@jest/globals'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test.each(['file:///workspace', 'file:///C:/workspace', 'file:///workspace%20with%20spaces', 'memfs:///workspace', 'vscode-remote://host/workspace'])(
  'loadContent uses the workspace URI %s',
  async (workspaceUri) => {
    using rendererRpc = RendererWorker.registerMockRpc({
      'GetActiveEditor.getActiveEditorId': () => 1,
      'Workspace.getUri': () => workspaceUri,
    })
    using editorRpc = EditorWorker.registerMockRpc({
      'Editor.getProblems': () => [],
      'Editor.getUri': () => 'file:///workspace/file.ts',
    })

    const result = await loadContent(createDefaultState(), {})

    expect(result.workspaceUri).toBe(workspaceUri)
    expect(rendererRpc.invocations).toContainEqual(['Workspace.getUri'])
    expect(editorRpc.invocations).toEqual([['Editor.getUri', 1], ['Editor.getProblems']])
  },
)

test('loadContent preserves the workspace URI when loading diagnostics fails', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
    'Workspace.getUri': () => 'memfs:///workspace',
  })
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.getProblems': () => {
      throw new Error('Failed to get problems')
    },
    'Editor.getUri': () => 'file:///workspace/file.ts',
  })

  const result = await loadContent(createDefaultState(), {})

  expect(result.workspaceUri).toBe('memfs:///workspace')
  expect(result.message).toBe('Error: Failed to get problems')
  expect(rendererRpc.invocations).toContainEqual(['Workspace.getUri'])
  expect(editorRpc.invocations).toEqual([['Editor.getUri', 1], ['Editor.getProblems']])
})
