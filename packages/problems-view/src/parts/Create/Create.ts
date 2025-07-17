import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ProblemsStates from '../ProblemsStates/ProblemsStates.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const create = (id: number, uri: string, x: number, y: number, width: number, height: number, workspaceUri: string): void => {
  const state: ProblemsState = {
    uid: id,
    problems: [],
    focusedIndex: -2,
    message: '',
    itemHeight: 22,
    x,
    y,
    width,
    height,
    filterValue: '',
    viewMode: ProblemsViewMode.None,
    inputSource: InputSource.User,
    minLineY: 0,
    maxLineY: 0,
    listItems: [],
    collapsedUris: [],
    smallWidthBreakPoint: 650,
    filteredProblems: [],
    workspaceUri,
  }
  ProblemsStates.set(id, state, state)
}
