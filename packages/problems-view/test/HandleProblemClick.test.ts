import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getVisibleProblems } from '../src/parts/GetVisibleProblems/GetVisibleProblems.ts'
import { handleProblemClick } from '../src/parts/HandleProblemClick/HandleProblemClick.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'
import * as ProblemType from '../src/parts/ProblemType/ProblemType.ts'

test('reveals and highlights the clicked problem without focusing the editor', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Main.openUri': async () => {},
  })
  const state: ProblemsState = {
    ...createDefaultState(),
    itemHeight: 22,
    problems: [
      {
        code: '',
        columnIndex: 7,
        count: 0,
        fileName: 'test.ts',
        level: 2,
        listItemType: ProblemListItemType.Item,
        message: 'problem',
        posInSet: 1,
        rowIndex: 4,
        setSize: 1,
        source: 'test',
        type: ProblemType.Error,
        uri: 'file:///workspace/test.ts',
      },
    ],
    viewMode: ProblemsViewMode.List,
    width: 800,
  }

  const result = await handleProblemClick(state, 50, 11)

  expect(result.focusedIndex).toBe(0)
  expect(rendererRpc.invocations).toEqual([
    [
      'Main.openUri',
      { initialCursorPosition: { columnIndex: 7, highlightProblem: true, rowIndex: 4 }, shouldFocus: false, uri: 'file:///workspace/test.ts' },
    ],
  ])
})

test('does not open a file when clicking a problem group', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Main.openUri': async () => {},
  })
  const state: ProblemsState = {
    ...createDefaultState(),
    itemHeight: 22,
    problems: [
      {
        code: '',
        columnIndex: 0,
        count: 1,
        fileName: 'test.ts',
        level: 1,
        listItemType: ProblemListItemType.Expanded,
        message: '',
        posInSet: 1,
        rowIndex: 0,
        setSize: 1,
        source: '',
        type: ProblemType.None,
        uri: 'file:///workspace/test.ts',
      },
    ],
    viewMode: ProblemsViewMode.List,
    width: 800,
  }

  const result = await handleProblemClick(state, 50, 11)

  expect(result.focusedIndex).toBe(0)
  expect(result.collapsedUris).toEqual(['file:///workspace/test.ts'])
  const expanded = await handleProblemClick(result, 50, 11)
  expect(expanded.collapsedUris).toEqual([])
  expect(expanded.focusedIndex).toBe(0)
  expect(rendererRpc.invocations).toEqual([])
})

test('opens a related diagnostic target', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Main.openUri': async () => {},
  })
  const state: ProblemsState = {
    ...createDefaultState(),
    itemHeight: 22,
    problems: [
      {
        code: '',
        columnIndex: 2,
        count: 0,
        fileName: 'types.ts',
        level: 3,
        listItemType: ProblemListItemType.Item,
        message: 'The expected type comes from here.',
        posInSet: 1,
        rowIndex: 1,
        setSize: 1,
        source: 'types.ts',
        targetUri: 'file:///workspace/types.ts',
        type: ProblemType.Error,
        uri: 'file:///workspace/main.ts',
      },
    ],
    viewMode: ProblemsViewMode.List,
    width: 800,
  }

  await handleProblemClick(state, 50, 11)

  expect(rendererRpc.invocations).toEqual([
    [
      'Main.openUri',
      { initialCursorPosition: { columnIndex: 2, highlightProblem: true, rowIndex: 1 }, shouldFocus: false, uri: 'file:///workspace/types.ts' },
    ],
  ])
})

test('clicking a file group collapses and expands its diagnostics', async () => {
  const group = {
    code: '',
    columnIndex: 0,
    count: 1,
    fileName: 'eslint.config.js',
    level: 1,
    listItemType: ProblemListItemType.Expanded,
    message: '',
    posInSet: 1,
    rowIndex: 0,
    setSize: 1,
    source: '',
    type: ProblemType.None,
    uri: 'file:///workspace/eslint.config.js',
  }
  const diagnostic = {
    ...group,
    level: 2,
    listItemType: ProblemListItemType.Item,
    message: 'ESLint configuration error: Failed to fetch',
    type: ProblemType.Error,
  }
  const state: ProblemsState = {
    ...createDefaultState(),
    height: 200,
    problems: [group, diagnostic],
    viewMode: ProblemsViewMode.List,
    width: 800,
  }

  const collapsed = await handleProblemClick(state, 50, 11)
  expect(collapsed.collapsedUris).toEqual([group.uri])
  expect(getVisibleProblems(collapsed.problems, {}, collapsed.collapsedUris, 0, '', 0, Infinity, collapsed.viewMode)).toHaveLength(1)
  expect(collapsed.maxLineY).toBe(1)

  const expanded = await handleProblemClick(collapsed, 50, 11)
  expect(expanded.collapsedUris).toEqual([])
  expect(getVisibleProblems(expanded.problems, {}, expanded.collapsedUris, 0, '', 0, Infinity, expanded.viewMode)).toHaveLength(2)
  expect(expanded.maxLineY).toBe(2)
})
