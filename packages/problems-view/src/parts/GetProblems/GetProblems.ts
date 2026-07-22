import type { ProblemsResult } from '../ProblemsResult/ProblemsResult.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import { toProblems } from '../ToProblems/ToProblems.ts'

export const getProblems = async (workspaceUri: string, activeUri: string): Promise<ProblemsResult> => {
  if (!activeUri) {
    return {
      error: '',
      problems: [],
    }
  }
  try {
    const diagnostics = await EditorWorker.getProblems()
    const activeDiagnostics = diagnostics.filter((diagnostic) => diagnostic.uri === activeUri)
    // @ts-ignore
    const problems = toProblems(activeDiagnostics, workspaceUri)
    return {
      error: '',
      problems,
    }
  } catch (error) {
    return {
      error: `${error}`,
      problems: [],
    }
  }
}
