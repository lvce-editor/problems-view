import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleProblemClick } from '../src/parts/HandleProblemClick/HandleProblemClick.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'
import * as ProblemType from '../src/parts/ProblemType/ProblemType.ts'

test('opens and focuses the clicked problem at its position', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': async () => {},
    'Main.focus': async () => {},
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
        relativePath: '',
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
    ['Main.openUri', { focus: true, uri: 'file:///workspace/test.ts' }],
    ['Main.focus'],
    ['Editor.cursorSet', 4, 7],
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
        relativePath: '',
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
  expect(rendererRpc.invocations).toEqual([])
})

test('opens a related diagnostic target', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': async () => {},
    'Main.focus': async () => {},
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
        relativePath: '',
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
    ['Main.openUri', { focus: true, uri: 'file:///workspace/types.ts' }],
    ['Main.focus'],
    ['Editor.cursorSet', 1, 2],
  ])
})
