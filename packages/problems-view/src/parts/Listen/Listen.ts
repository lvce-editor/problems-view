import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import { initializeEditorWorkerRpc } from '../InitializeEditorWorkerRpc/InitializeEditorWorkerRpc.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'
import { registerCommands } from '../ProblemsStates/ProblemsStates.ts'

export const listen = async (): Promise<void> => {
  Object.assign(CommandMapRef.commandMapRef, CommandMap.commandMap)
  registerCommands(CommandMap.commandMap)
  await Promise.all([initializeRendererWorker(), initializeEditorWorkerRpc()])
}
