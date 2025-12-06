import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const createDefaultState = (): ProblemsState => {
  const state: ProblemsState = {
    collapsedUris: [],
    filteredProblems: [],
    filterValue: '',
    focusedIndex: -2,
    height: 0,
    inputSource: InputSource.User,
    itemHeight: 22,
    listItems: [],
    maxLineY: 0,
    message: '',
    minLineY: 0,
    problems: [],
    smallWidthBreakPoint: 650,
    uid: 0,
    viewMode: ProblemsViewMode.None,
    width: 0,
    workspaceUri: '',
    x: 0,
    y: 0,
  }
  return state
}
