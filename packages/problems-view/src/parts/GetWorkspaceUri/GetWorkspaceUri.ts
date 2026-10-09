import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getWorkspaceUri = (): Promise<string> => {
  return RendererWorker.invoke('Workspace.getUri')
}
