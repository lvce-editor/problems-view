import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeEditorWorkerRpc } from '../InitializeEditorWorkerRpc/InitializeEditorWorkerRpc.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'
import { registerCommands } from '../ProblemsStates/ProblemsStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  await Promise.all([initializeRendererWorker(CommandMap.commandMap), initializeEditorWorkerRpc()])
}
