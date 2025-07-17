import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const createDefaultState = (): ProblemsState => {
  const state: ProblemsState = {
    uid: 0,
    problems: [],
    focusedIndex: -2,
    message: '',
    itemHeight: 22,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    filterValue: '',
    viewMode: ProblemsViewMode.None,
    inputSource: InputSource.User,
    minLineY: 0,
    maxLineY: 0,
    listItems: [],
    collapsedUris: [],
    smallWidthBreakPoint: 650,
    filteredProblems: [],
    workspaceUri: '',
  }
  return state
}
