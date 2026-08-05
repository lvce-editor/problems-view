import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getWorkspacePath = (): Promise<string> => {
  return RendererWorker.getWorkspacePath()
}
