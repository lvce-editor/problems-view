import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { ProblemsResult } from '../ProblemsResult/ProblemsResult.ts'
import { getUniqueDiagnostics } from '../GetUniqueDiagnostics/GetUniqueDiagnostics.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import { toProblems } from '../ToProblems/ToProblems.ts'

export const getProblems = async (activeUri: string): Promise<ProblemsResult> => {
  if (!activeUri) {
    return {
      error: '',
      problems: [],
    }
  }
  try {
    const [allDiagnostics, visibleUris] = await Promise.all([
      Promise.try(() => EditorWorker.getProblems()),
      Promise.try(() => RendererWorker.getVisibleEditorUris(activeUri)),
    ])
    const visibleUriSet = new Set(visibleUris)
    visibleUriSet.add(activeUri)
    const diagnostics = getUniqueDiagnostics(allDiagnostics.filter((diagnostic) => visibleUriSet.has(diagnostic.uri)))
    const problems = toProblems(diagnostics)
    return {
      error: '',
      problems,
    }
  } catch (error) {
    return {
      error: String(error),
      problems: [],
    }
  }
}
