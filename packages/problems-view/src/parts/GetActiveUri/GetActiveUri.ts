import { EditorWorker } from '@lvce-editor/rpc-registry'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const getActiveUri = async (): Promise<string> => {
  const editorId = await RendererWorker.getActiveEditorId()
  if (editorId === -1) {
    return ''
  }
  try {
    return await EditorWorker.getUri(editorId)
  } catch {
    return ''
  }
}
