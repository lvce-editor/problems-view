import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const getActiveUri = async (): Promise<string> => {
  const editorId = await RendererWorker.getActiveEditorId()
  if (editorId === -1) {
    return ''
  }
  return EditorWorker.getUri(editorId)
}
