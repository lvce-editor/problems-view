import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import type * as CommandMap from '../CommandMap/CommandMap.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const initializeRendererWorker = async (commandMap: Readonly<typeof CommandMap.commandMap>): Promise<void> => {
  const rpc = await WebWorkerRpcClient.create({
    commandMap,
  })
  RendererWorker.set(rpc)
}
