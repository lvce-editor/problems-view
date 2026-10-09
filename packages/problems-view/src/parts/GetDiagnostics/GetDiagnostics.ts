import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'

export const getDiagnostics = (editorId: number): Promise<readonly Diagnostic[]> => {
  return EditorWorker.invoke('Editor.getDiagnostics', editorId)
}
