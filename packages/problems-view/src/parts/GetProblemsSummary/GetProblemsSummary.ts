import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProblemsSummary } from '../ProblemsSummary/ProblemsSummary.ts'
import { countByType } from '../CountByType/CountByType.ts'
import * as DiagnosticType from '../DiagnosticType/DiagnosticType.ts'
import { getActiveDiagnostics } from '../GetActiveDiagnostics/GetActiveDiagnostics.ts'
import { getUniqueDiagnostics } from '../GetUniqueDiagnostics/GetUniqueDiagnostics.ts'

export const getProblemsSummary = async (): Promise<ProblemsSummary> => {
  const editorId = await RendererWorker.getActiveEditorId()
  if (editorId === -1) {
    return {
      errorCount: 0,
      hasEditor: false,
      problemCount: 0,
      warningCount: 0,
    }
  }
  const [allDiagnostics, activeDiagnostics] = await Promise.all([EditorWorker.getProblems(), getActiveDiagnostics(editorId)])
  const uniqueDiagnostics = getUniqueDiagnostics(allDiagnostics)
  const uniqueActiveDiagnostics = getUniqueDiagnostics(activeDiagnostics)
  return {
    errorCount: countByType(uniqueActiveDiagnostics, DiagnosticType.Error),
    hasEditor: true,
    problemCount: uniqueDiagnostics.length,
    warningCount: countByType(uniqueActiveDiagnostics, DiagnosticType.Warning),
  }
}
