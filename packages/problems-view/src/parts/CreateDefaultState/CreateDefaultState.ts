import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const createDefaultState = (): ProblemsState => {
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
    height: 0,
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
    uid: 0,
    viewMode: ProblemsViewMode.None,
    width: 0,
    workspaceUri: '',
    x: 0,
    y: 0,
  }
  return state
}
