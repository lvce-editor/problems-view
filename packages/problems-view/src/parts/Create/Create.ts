import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ProblemsStates from '../ProblemsStates/ProblemsStates.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const create = (id: number, uri: string, x: number, y: number, width: number, height: number, workspaceUri: string): void => {
  const state: ProblemsState = {
    collapsedUris: [],
    filteredProblems: [],
    filterValue: '',
    focusedIndex: -2,
    height,
    inputSource: InputSource.User,
    itemHeight: 22,
    listItems: [],
    maxLineY: 0,
    message: '',
    minLineY: 0,
    problems: [],
    showErrors: true,
    showInfos: true,
    showWarnings: true,
    smallWidthBreakPoint: 650,
    uid: id,
    viewMode: ProblemsViewMode.None,
    width,
    workspaceUri,
    x,
    y,
  }
  ProblemsStates.set(id, state, state)
}
