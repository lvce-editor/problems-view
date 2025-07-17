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
    uri: 'test.ts',
    message: 'Test error',
    source: 'TypeScript',
    code: 'TS1234',
    type: 'error',
    rowIndex: 1,
    columnIndex: 1,
    relativePath: 'test.ts',
    level: 1,
    count: 1,
    posInSet: 1,
    setSize: 1,
    listItemType: 1,
    fileName: '',
  }
}

test('getActions returns filter action when not small width', () => {
  const state = createMockState({
    width: 800,
    smallWidthBreakPoint: 650,
    problems: [createMockProblem(), createMockProblem()],
    filterValue: '',
  })

  const actions = getActions(state)

  expect(actions).toHaveLength(3)
  expect(actions[0]).toEqual({
    type: ActionType.ProblemsFilter,
    id: 'Filter',
    command: DomEventListenerFunctions.HandleFilterInput,
    badgeText: '',
    placeholder: expect.any(String),
    value: '',
  })
})

test('getActions does not return filter action when small width', () => {
  const state = createMockState({
    width: 600,
    smallWidthBreakPoint: 650,
    problems: [createMockProblem()],
  })

  const actions = getActions(state)

  expect(actions).toHaveLength(2)
  expect(actions[0].type).toBe(ActionType.Button)
  expect(typeof actions[0].id).toBe('string')
})

test('getActions shows badge text when filtered problems differ from total', () => {
  const state = createMockState({
    width: 800,
    problems: [createMockProblem(), createMockProblem(), createMockProblem()],
    filterValue: 'specific',
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
    type: ActionType.Button,
    id: expect.any(String),
    command: 'viewAsList',
    icon: MaskIcon.ListTree,
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
    type: ActionType.Button,
    id: expect.any(String),
    command: 'collapseAll',
    icon: MaskIcon.CollapseAll,
  })
  expect(actions[2]).toEqual({
    type: ActionType.Button,
    id: expect.any(String),
    command: 'viewAsTable',
    icon: MaskIcon.ListFlat,
  })
})

test('getActions sets filter value when input source is script', () => {
  const state = createMockState({
    width: 800,
    inputSource: InputSource.Script,
    filterValue: 'test filter',
  })

  const actions = getActions(state)

  expect(actions[0].value).toBe('test filter')
})

test('getActions sets empty filter value when input source is user', () => {
  const state = createMockState({
    width: 800,
    inputSource: InputSource.User,
    filterValue: 'test filter',
  })

  const actions = getActions(state)

  expect(actions[0].value).toBe('')
})

test('getActions with no problems and small width', () => {
  const state = createMockState({
    width: 600,
    problems: [],
  })

  const actions = getActions(state)

  expect(actions).toHaveLength(2)
  expect(actions[0].type).toBe(ActionType.Button)
  expect(actions[1].type).toBe(ActionType.Button)
})

test('getActions with filtered problems showing different count', () => {
  const state = createMockState({
    width: 800,
    problems: [createMockProblem(), createMockProblem(), createMockProblem()],
    filterValue: 'specific',
  })

  const actions = getActions(state)

  expect(actions[0].badgeText).toContain('0')
  expect(actions[0].badgeText).toContain('3')
})
