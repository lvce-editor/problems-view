import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { ProblemsSummary } from '../ProblemsSummary/ProblemsSummary.ts'
import { countByType } from '../CountByType/CountByType.ts'
import * as DiagnosticType from '../DiagnosticType/DiagnosticType.ts'
import { getActiveDiagnostics } from '../GetActiveDiagnostics/GetActiveDiagnostics.ts'
import { getUniqueDiagnostics } from '../GetUniqueDiagnostics/GetUniqueDiagnostics.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const getProblemsSummary = async (activeUri = '', applicationId?: string): Promise<ProblemsSummary> => {
  const editorId = await RendererWorker.getActiveEditorId(applicationId)
  if (editorId === -1) {
    return {
      errorCount: 0,
      hasEditor: false,
      problemCount: 0,
      warningCount: 0,
    }
  }
  const [allDiagnostics, activeDiagnostics] = await Promise.all([
    Promise.try(() => EditorWorker.getProblems()),
    Promise.try(() => getActiveDiagnostics(editorId)),
  ])
  const allDiagnosticUris = [...new Set(allDiagnostics.map((diagnostic) => diagnostic.uri))]
  const visibleUris = await RendererWorker.getVisibleEditorUris(activeUri, allDiagnosticUris, applicationId)
  const visibleUriSet = new Set(visibleUris)
  if (activeUri) {
    visibleUriSet.add(activeUri)
  }
  const uniqueDiagnostics = getUniqueDiagnostics(allDiagnostics.filter((diagnostic) => visibleUriSet.has(diagnostic.uri)))
  const uniqueActiveDiagnostics = getUniqueDiagnostics(activeDiagnostics)
  return {
    errorCount: countByType(uniqueActiveDiagnostics, DiagnosticType.Error),
    hasEditor: true,
    problemCount: uniqueDiagnostics.length,
    warningCount: countByType(uniqueActiveDiagnostics, DiagnosticType.Warning),
  }
}
