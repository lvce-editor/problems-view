import type { Rpc } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { OpenUriOptions } from '../OpenUriOptions/OpenUriOptions.ts'

const notFoundRegex = /not found/i

export const getActiveEditorId = (): Promise<number> => {
  return RendererWorker.getActiveEditorId()
}

export const getVisibleEditorUris = async (fallbackUri = '', unavailableFallbackUris?: readonly string[]): Promise<readonly string[]> => {
  try {
    return await RendererWorker.invoke('GetActiveEditor.getVisibleEditorUris')
  } catch (error) {
    const errorMessage = String(error)
    const isVisibleEditorsCommandNotFound = errorMessage.includes('GetActiveEditor.getVisibleEditorUris') && notFoundRegex.test(errorMessage)
    if (!isVisibleEditorsCommandNotFound) {
      throw error
    }
    if (unavailableFallbackUris) {
      return unavailableFallbackUris
    }
    if (fallbackUri) {
      return [fallbackUri]
    }
    const editorId = await RendererWorker.getActiveEditorId()
    if (editorId === -1) {
      return []
    }
    try {
      const activeUri = await EditorWorker.getUri(editorId)
      return activeUri ? [activeUri] : []
    } catch {
      return []
    }
  }
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
