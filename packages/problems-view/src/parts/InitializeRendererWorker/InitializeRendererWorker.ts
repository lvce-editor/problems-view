import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const initializeRendererWorker = async (): Promise<void> => {
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMapRef.commandMapRef,
  })
  RendererWorker.set(rpc)
}
