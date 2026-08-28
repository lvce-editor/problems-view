import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ProblemsStrings from '../ProblemStrings/ProblemStrings.ts'

export const handleWorkspaceChange = (state: ProblemsState, workspaceUri: string): ProblemsState => {
  if (workspaceUri === state.workspaceUri) {
    return state
  }
  return {
    ...state,
    activeUri: '',
    collapsedUris: [],
    deltaY: 0,
    fileIconCache: {},
    filteredProblems: [],
    finalDeltaY: 0,
    focusedIndex: -2,
    handleOffset: 0,
    listItems: [],
    maxLineY: 0,
    message: ProblemsStrings.getMessage(0),
    minLineY: 0,
    problems: [],
    scrollBarActive: false,
    scrollBarHeight: 0,
    workspaceUri,
  }
}
