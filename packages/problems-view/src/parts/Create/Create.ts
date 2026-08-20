import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ProblemsStates from '../ProblemsStates/ProblemsStates.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const create = (id: number, uri: string, x: number, y: number, width: number, height: number, workspaceUri: string): void => {
  const state: ProblemsState = {
    activeUri: '',
    collapsedUris: [],
    deltaY: 0,
    fileIconCache: {},
    filteredProblems: [],
    filterValue: '',
    finalDeltaY: 0,
    focusedIndex: -2,
    handleOffset: 0,
    height,
    inputSource: InputSource.User,
    itemHeight: 22,
    listItems: [],
    maxLineY: 0,
    message: '',
    minimumSliderSize: 20,
    minLineY: 0,
    problems: [],
    scrollBarActive: false,
    scrollBarHeight: 0,
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
