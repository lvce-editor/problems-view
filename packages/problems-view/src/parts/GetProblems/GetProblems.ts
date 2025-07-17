import type { ProblemsResult } from '../ProblemsResult/ProblemsResult.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const getProblems = async (state: any): Promise<ProblemsResult> => {
  try {
    // TODO send event listener to editor, asking to send problem updates to this worker
    // @ts-ignore
    await EditorWorker.invoke('Editor.getProblems')
    // TODO ask editor worker for problems
    return {
      problems: [],
      error: '',
    }
  } catch (error) {
    return {
      problems: [],
      error: `${error}`,
    }
  }
}
