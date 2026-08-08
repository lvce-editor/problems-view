import type { Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getActiveEditorId = (): Promise<number> => {
  return RendererWorker.getActiveEditorId()
}

export const focusEditor = async (): Promise<void> => {
  await RendererWorker.invoke('Main.focus')
}

export const openUri = (uri: string, focus: boolean): Promise<void> => {
  return RendererWorker.openUri(uri, focus)
}

export const setEditorCursor = async (rowIndex: number, columnIndex: number): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorSet', rowIndex, columnIndex)
}

export const sendMessagePortToEditorWorker = (port: any, rpcId: number): Promise<void> => {
  return RendererWorker.sendMessagePortToEditorWorker(port, rpcId)
}

export const set = (rpc: Rpc): void => {
  RendererWorker.set(rpc)
}

export const writeClipBoardText = (text: string): Promise<void> => {
  return RendererWorker.writeClipBoardText(text)
}
