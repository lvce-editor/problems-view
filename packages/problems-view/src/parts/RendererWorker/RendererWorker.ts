import type { Rpc } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { OpenUriOptions } from '../OpenUriOptions/OpenUriOptions.ts'

const notFoundRegex = /not found/i

export const getActiveEditorId = (applicationId?: string): Promise<number> => {
  return applicationId === undefined
    ? RendererWorker.getActiveEditorId()
    : RendererWorker.invoke('Application.execute', applicationId, 'GetActiveEditor.getActiveEditorId')
}

export const getVisibleEditorUris = async (
  fallbackUri = '',
  unavailableFallbackUris?: readonly string[],
  applicationId?: string,
): Promise<readonly string[]> => {
  try {
    return await (applicationId === undefined
      ? RendererWorker.invoke('GetActiveEditor.getVisibleEditorUris')
      : RendererWorker.invoke('Application.execute', applicationId, 'GetActiveEditor.getVisibleEditorUris'))
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
    const editorId = await getActiveEditorId(applicationId)
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

export const openUri = async (options: OpenUriOptions, applicationId?: string): Promise<void> => {
  if (applicationId === undefined) {
    await RendererWorker.invoke('Main.openUri', options)
  } else {
    await RendererWorker.invoke('Application.execute', applicationId, 'Main.openUri', options)
  }
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
