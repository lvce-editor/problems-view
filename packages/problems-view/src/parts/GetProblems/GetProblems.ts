import type { ProblemsResult } from '../ProblemsResult/ProblemsResult.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import { toProblems } from '../ToProblems/ToProblems.ts'

// TODO send event listener to editor, asking to send problem updates to this worker

export const getProblems = async (state: any): Promise<ProblemsResult> => {
  try {
    // @ts-ignore
    const diagnostics = await EditorWorker.invoke('Editor.getProblems')
    // @ts-ignore
    const problems = toProblems(diagnostics)
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
