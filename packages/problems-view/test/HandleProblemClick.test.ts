import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleProblemClick } from '../src/parts/HandleProblemClick/HandleProblemClick.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'

test('opens and focuses the clicked problem at its position', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
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
        type: 'error',
        uri: 'file:///workspace/test.ts',
      },
    ],
    viewMode: ProblemsViewMode.List,
    width: 800,
  }

  const result = await handleProblemClick(state, 50, 11)

  expect(result.focusedIndex).toBe(0)
  expect(mockRpc.invocations).toEqual([
    [
      'Main.openUri',
      {
        focus: true,
        selections: new Uint32Array([4, 7, 4, 7]),
        uri: 'file:///workspace/test.ts',
      },
    ],
  ])
})

test('does not open a file when clicking a problem group', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
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
        type: '',
        uri: 'file:///workspace/test.ts',
      },
    ],
    viewMode: ProblemsViewMode.List,
    width: 800,
  }

  const result = await handleProblemClick(state, 50, 11)

  expect(result.focusedIndex).toBe(0)
  expect(mockRpc.invocations).toEqual([])
})
