import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'
import type { ProblemsSummary } from '../ProblemsSummary/ProblemsSummary.ts'
import * as DiagnosticType from '../DiagnosticType/DiagnosticType.ts'
import { getDiagnostics } from '../GetDiagnostics/GetDiagnostics.ts'
import { getUniqueDiagnostics } from '../GetProblems/GetProblems.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

const countByType = (diagnostics: readonly Diagnostic[], type: string): number => {
  return diagnostics.filter((diagnostic) => diagnostic.type === type).length
}

const getActiveDiagnostics = async (editorId: number): Promise<readonly Diagnostic[]> => {
  try {
    return await getDiagnostics(editorId)
  } catch {
    return []
  }
}

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
