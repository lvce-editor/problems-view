import { test, expect } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import * as ActionType from '../src/parts/ActionType/ActionType.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getActions } from '../src/parts/GetProblemActions/GetProblemActions.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as MaskIcon from '../src/parts/MaskIcon/MaskIcon.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'
import * as ProblemType from '../src/parts/ProblemType/ProblemType.ts'

const createMockState = (overrides: Partial<ProblemsState> = {}): ProblemsState => {
  return {
    ...createDefaultState(),
    ...overrides,
  }
}

const createMockProblem = (overrides: Partial<Problem> = {}): Problem => {
  return {
    code: 'TS1234',
    columnIndex: 1,
    count: 1,
    fileName: '',
    level: 1,
    listItemType: ProblemListItemType.Item,
    message: 'Test error',
    posInSet: 1,
    rowIndex: 1,
    setSize: 1,
    source: 'TypeScript',
    type: ProblemType.Error,
    uri: 'test.ts',
    ...overrides,
  }
}

const getFilterBadgeText = (state: ProblemsState): string => {
  return getActions(state)[0].badgeText as string
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
    name: 'ProblemsInput',
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

test('getActions hides table badge when file group rows are excluded', () => {
  const state = createMockState({
    problems: [
      createMockProblem({ listItemType: ProblemListItemType.Expanded, message: '' }),
      createMockProblem({ message: 'first diagnostic' }),
      createMockProblem({ message: 'second diagnostic' }),
    ],
    viewMode: ProblemsViewMode.Table,
    width: 800,
  })

  expect(getFilterBadgeText(state)).toBe('')
})

test('getActions excludes multiple file groups from the table count', () => {
  const state = createMockState({
    problems: [
      createMockProblem({ listItemType: ProblemListItemType.Expanded, message: '', uri: 'first.ts' }),
      createMockProblem({ message: 'first diagnostic', uri: 'first.ts' }),
      createMockProblem({ listItemType: ProblemListItemType.Expanded, message: '', uri: 'second.ts' }),
      createMockProblem({ message: 'second diagnostic', uri: 'second.ts' }),
    ],
    viewMode: ProblemsViewMode.Table,
    width: 800,
  })

  expect(getFilterBadgeText(state)).toBe('')
})

test('getActions uses table diagnostic rows as the denominator when filtered', () => {
  const state = createMockState({
    filterValue: 'first diagnostic',
    problems: [
      createMockProblem({ listItemType: ProblemListItemType.Expanded, message: '' }),
      createMockProblem({ message: 'first diagnostic' }),
      createMockProblem({ message: 'second diagnostic' }),
    ],
    viewMode: ProblemsViewMode.Table,
    width: 800,
  })

  expect(getFilterBadgeText(state)).toBe('Showing 1 of 2 ')
})

test('getActions excludes severities disabled by the severity filters from the table denominator', () => {
  const state = createMockState({
    problems: [
      createMockProblem({ listItemType: ProblemListItemType.Expanded, message: '' }),
      createMockProblem({ message: 'error', type: ProblemType.Error }),
      createMockProblem({ message: 'warning', type: ProblemType.Warning }),
    ],
    showWarnings: false,
    viewMode: ProblemsViewMode.Table,
    width: 800,
  })

  expect(getFilterBadgeText(state)).toBe('')
})

test('getActions uses zero as the table count when filters match no diagnostics', () => {
  const state = createMockState({
    filterValue: 'missing',
    problems: [
      createMockProblem({ listItemType: ProblemListItemType.Expanded, message: '' }),
      createMockProblem({ message: 'first diagnostic' }),
      createMockProblem({ message: 'second diagnostic' }),
    ],
    viewMode: ProblemsViewMode.Table,
    width: 800,
  })

  expect(getFilterBadgeText(state)).toBe('Showing 0 of 2 ')
})

test('getActions returns viewAsList button when in table mode', () => {
  const state = createMockState({
    viewMode: ProblemsViewMode.Table,
    width: 800,
  })

  const actions = getActions(state)

  expect(actions).toHaveLength(2)
  expect(actions[1]).toEqual({
    command: DomEventListenerFunctions.HandleViewAsList,
    icon: MaskIcon.ListTree,
    id: expect.any(String),
    name: 'viewAsList',
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
    command: DomEventListenerFunctions.HandleCollapseAll,
    icon: MaskIcon.CollapseAll,
    id: expect.any(String),
    name: 'collapseAll',
    type: ActionType.Button,
  })
  expect(actions[2]).toEqual({
    command: DomEventListenerFunctions.HandleViewAsTable,
    icon: MaskIcon.ListFlat,
    id: expect.any(String),
    name: 'viewAsTable',
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

  expect(actions[0].name).toBe('ProblemsInput')
  expect(actions[0].value).toBe('test filter')
})

test('getActions sets empty filter value when input source is user', () => {
  const state = createMockState({
    filterValue: 'test filter',
    inputSource: InputSource.User,
    width: 800,
  })

  const actions = getActions(state)

  expect(actions[0].name).toBe('ProblemsInput')
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
