import { test, expect } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import * as ActionType from '../src/parts/ActionType/ActionType.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getActions } from '../src/parts/GetProblemActions/GetProblemActions.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as MaskIcon from '../src/parts/MaskIcon/MaskIcon.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'

const createMockState = (overrides: Partial<ProblemsState> = {}): ProblemsState => {
  return {
    ...createDefaultState(),
    ...overrides,
  }
}

const createMockProblem = (): Problem => {
  return {
    code: 'TS1234',
    columnIndex: 1,
    count: 1,
    fileName: '',
    level: 1,
    listItemType: 1,
    message: 'Test error',
    posInSet: 1,
    relativePath: 'test.ts',
    rowIndex: 1,
    setSize: 1,
    source: 'TypeScript',
    type: 'error',
    uri: 'test.ts',
  }
}

test('getActions returns filter action when not small width', () => {
  const state = createMockState({
    filterValue: '',
    problems: [createMockProblem(), createMockProblem()],
    smallWidthBreakPoint: 650,
    width: 800,
  })

  const actions = getActions(state)

  expect(actions).toHaveLength(3)
  expect(actions[0]).toEqual({
    badgeText: '',
    command: DomEventListenerFunctions.HandleFilterInput,
    id: 'Filter',
    placeholder: expect.any(String),
    type: ActionType.ProblemsFilter,
    value: '',
  })
})

test('getActions does not return filter action when small width', () => {
  const state = createMockState({
    problems: [createMockProblem()],
    smallWidthBreakPoint: 650,
    width: 600,
  })

  const actions = getActions(state)

  expect(actions).toHaveLength(2)
  expect(actions[0].type).toBe(ActionType.Button)
  expect(typeof actions[0].id).toBe('string')
})

test('getActions shows badge text when filtered problems differ from total', () => {
  const state = createMockState({
    filterValue: 'specific',
    problems: [createMockProblem(), createMockProblem(), createMockProblem()],
    width: 800,
  })

  const actions = getActions(state)

  expect(actions[0].badgeText).toContain('0')
  expect(actions[0].badgeText).toContain('3')
})

test('getActions returns viewAsList button when in table mode', () => {
  const state = createMockState({
    viewMode: ProblemsViewMode.Table,
    width: 800,
  })

  const actions = getActions(state)

  expect(actions).toHaveLength(2)
  expect(actions[1]).toEqual({
    command: 'viewAsList',
    icon: MaskIcon.ListTree,
    id: expect.any(String),
    type: ActionType.Button,
  })
})

test('getActions returns collapseAll and viewAsTable buttons when in list mode', () => {
  const state = createMockState({
    viewMode: ProblemsViewMode.List,
    width: 800,
  })

  const actions = getActions(state)

  expect(actions).toHaveLength(3)
  expect(actions[1]).toEqual({
    command: 'collapseAll',
    icon: MaskIcon.CollapseAll,
    id: expect.any(String),
    type: ActionType.Button,
  })
  expect(actions[2]).toEqual({
    command: 'viewAsTable',
    icon: MaskIcon.ListFlat,
    id: expect.any(String),
    type: ActionType.Button,
  })
})

test('getActions sets filter value when input source is script', () => {
  const state = createMockState({
    filterValue: 'test filter',
    inputSource: InputSource.Script,
    width: 800,
  })

  const actions = getActions(state)

  expect(actions[0].value).toBe('test filter')
})

test('getActions sets empty filter value when input source is user', () => {
  const state = createMockState({
    filterValue: 'test filter',
    inputSource: InputSource.User,
    width: 800,
  })

  const actions = getActions(state)

  expect(actions[0].value).toBe('')
})

test('getActions with no problems and small width', () => {
  const state = createMockState({
    problems: [],
    width: 600,
  })

  const actions = getActions(state)

  expect(actions).toHaveLength(2)
  expect(actions[0].type).toBe(ActionType.Button)
  expect(actions[1].type).toBe(ActionType.Button)
})

test('getActions with filtered problems showing different count', () => {
  const state = createMockState({
    filterValue: 'specific',
    problems: [createMockProblem(), createMockProblem(), createMockProblem()],
    width: 800,
  })

  const actions = getActions(state)

  expect(actions[0].badgeText).toContain('0')
  expect(actions[0].badgeText).toContain('3')
})
