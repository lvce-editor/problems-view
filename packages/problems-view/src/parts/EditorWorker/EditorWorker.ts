import { EditorWorker } from '@lvce-editor/rpc-registry'

export const { dispose, getProblems, getUri, set } = EditorWorker

export const getDiagnostics = (editorId: number): Promise<readonly any[]> => {
  return EditorWorker.invoke('Editor.getDiagnostics', editorId)
}
