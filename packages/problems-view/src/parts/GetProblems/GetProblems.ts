import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { ProblemsResult } from '../ProblemsResult/ProblemsResult.ts'
import { getUniqueDiagnostics } from '../GetUniqueDiagnostics/GetUniqueDiagnostics.ts'
import { toProblems } from '../ToProblems/ToProblems.ts'

export const getProblems = async (activeUri: string): Promise<ProblemsResult> => {
  if (!activeUri) {
    return {
      error: '',
      problems: [],
    }
  }
  try {
    const diagnostics = getUniqueDiagnostics(await EditorWorker.getProblems())
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
