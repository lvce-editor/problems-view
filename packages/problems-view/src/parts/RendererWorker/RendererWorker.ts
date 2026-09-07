import type { Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { OpenUriOptions } from '../OpenUriOptions/OpenUriOptions.ts'

export const getActiveEditorId = (): Promise<number> => {
  return RendererWorker.getActiveEditorId()
}

export const openUri = async (options: OpenUriOptions): Promise<void> => {
  await RendererWorker.invoke('Main.openUri', options)
}

export const sendMessagePortToEditorWorker = (port: MessagePort, rpcId: number): Promise<void> => {
  return RendererWorker.sendMessagePortToEditorWorker(port, rpcId)
}

export const set = (rpc: Rpc): void => {
  RendererWorker.set(rpc)
}

export const writeClipBoardText = (text: string): Promise<void> => {
  return RendererWorker.writeClipBoardText(text)
}
