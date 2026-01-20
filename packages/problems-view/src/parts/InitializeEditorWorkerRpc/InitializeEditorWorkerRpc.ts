import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { VError } from '@lvce-editor/verror'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

const send = (port: any): Promise<void> => {
  return RendererWorker.sendMessagePortToEditorWorker(port, 0)
}

export const initializeEditorWorkerRpc = async (): Promise<Rpc> => {
  try {
    const rpc = await LazyTransferMessagePortRpcParent.create({
      commandMap: {},
      send,
    })
    EditorWorker.set(rpc)
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create editor worker rpc`)
  }
}
