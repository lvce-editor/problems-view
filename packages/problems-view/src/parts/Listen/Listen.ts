import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeEditorWorkerRpc } from '../InitializeEditorWorkerRpc/InitializeEditorWorkerRpc.ts'
import { registerCommands } from '../ProblemsStates/ProblemsStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  await Promise.all([RendererWorker.initializeRendererWorkerForWorker(CommandMap.commandMap), initializeEditorWorkerRpc()])
}
