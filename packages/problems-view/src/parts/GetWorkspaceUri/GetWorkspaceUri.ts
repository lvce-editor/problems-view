import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getWorkspaceUri = (applicationId?: string): Promise<string> => {
  return applicationId === undefined
    ? RendererWorker.invoke('Workspace.getUri')
    : RendererWorker.invoke('Application.execute', applicationId, 'Workspace.getUri')
}
