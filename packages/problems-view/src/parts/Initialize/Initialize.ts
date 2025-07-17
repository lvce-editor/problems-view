import * as CreateEditorWorkerRpc from '../CreateEditorWorkerRpc/CreateEditorWorkerRpc.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const initialize = async (): Promise<void> => {
  const rpc = await CreateEditorWorkerRpc.createEditorWorkerRpc()
  EditorWorker.set(rpc)
}
