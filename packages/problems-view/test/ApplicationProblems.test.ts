import { expect, test } from '@jest/globals'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { create } from '../src/parts/Create/Create.ts'
import { getProblemsSummary } from '../src/parts/GetProblemsSummary/GetProblemsSummary.ts'
import { handleDiagnosticsChange } from '../src/parts/HandleActiveEditorChange/HandleActiveEditorChange.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as ProblemsStates from '../src/parts/ProblemsStates/ProblemsStates.ts'

const sourceUri = 'sample-source:///sample/src/main.ts'
const previewUri = 'memfs:///preview/example.txt'

test('loading and refreshing preview Problems never reads source editor services', async () => {
  const commands: Record<string, (...args: readonly any[]) => unknown> = {
    'Application.execute': async (applicationId: string, command: string): Promise<unknown> => {
      expect(applicationId).toBe('preview')
      switch (command) {
        case 'GetActiveEditor.getActiveEditorId':
          return 20
        case 'GetActiveEditor.getVisibleEditorUris':
          return [previewUri]
        case 'Workspace.getUri':
          return 'memfs:///preview'
        default:
          throw new Error(`Unexpected application command: ${command}`)
      }
    },
    'GetActiveEditor.getActiveEditorId': () => 10,
    'GetActiveEditor.getVisibleEditorUris': () => [sourceUri],
    'IconTheme.getFileIcon': () => '',
    'Workspace.getUri': () => 'sample-source:///sample',
  }
  using renderer = RendererWorker.registerMockRpc(commands)
  let message = 'preview problem'
  using editor = EditorWorker.registerMockRpc({
    'Editor.getDiagnostics': (id: number) => [
      { message: id === 20 ? message : 'source problem', type: 'error', uri: id === 20 ? previewUri : sourceUri },
    ],
    'Editor.getProblems': () => [
      { message: 'source problem', type: 'error', uri: sourceUri },
      { message, type: 'error', uri: previewUri },
    ],
    'Editor.getUri': (id: number) => (id === 20 ? previewUri : sourceUri),
  })
  create(1, '', 0, 0, 500, 300, '', 'preview')
  const { newState } = ProblemsStates.get(1)
  const loaded = await loadContent(newState, {})
  expect(loaded.workspaceUri).toBe('memfs:///preview')
  expect(loaded.activeUri).toBe(previewUri)
  expect(loaded.problems.some((problem) => problem.message === 'preview problem')).toBe(true)
  expect(loaded.problems.some((problem) => problem.uri === sourceUri)).toBe(false)
  message = 'updated preview problem'
  const refreshed = await handleDiagnosticsChange(loaded, previewUri)
  expect(refreshed.problems.some((problem) => problem.message === message)).toBe(true)
  expect(refreshed.problems.some((problem) => problem.uri === sourceUri)).toBe(false)
  const summary = await getProblemsSummary(previewUri, 'preview')
  expect(summary).toMatchObject({ errorCount: 1, hasEditor: true, problemCount: 1 })
  expect(renderer.invocations.some(([command]) => command === 'GetActiveEditor.getActiveEditorId')).toBe(false)
  expect(renderer.invocations.some(([command]) => command === 'GetActiveEditor.getVisibleEditorUris')).toBe(false)
  expect(editor.invocations).toContainEqual(['Editor.getUri', 20])
})
