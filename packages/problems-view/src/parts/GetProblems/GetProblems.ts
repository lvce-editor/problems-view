import type { ProblemsResult } from '../ProblemsResult/ProblemsResult.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import { toProblems } from '../ToProblems/ToProblems.ts'

// TODO send event listener to editor, asking to send problem updates to this worker

export const getProblems = async (workspaceUri: string): Promise<ProblemsResult> => {
  try {
    const diagnostics = await EditorWorker.getProblems()
    // @ts-ignore
    const problems = toProblems(diagnostics, workspaceUri)
    return {
      problems,
      error: '',
    }
  } catch (error) {
    return {
      problems: [],
      error: `${error}`,
    }
  }
}
