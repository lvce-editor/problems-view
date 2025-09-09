import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import { copyMessage } from '../src/parts/CopyMessage/CopyMessage.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('copyMessage should copy the focused problem message to clipboard', async () => {
  const mockProblem: Problem = {
    code: 'E1001',
    columnIndex: 10,
    count: 1,
    fileName: 'test.ts',
    level: 1,
    listItemType: 1,
    message: 'Test error message',
    posInSet: 1,
    relativePath: 'test.ts',
    rowIndex: 5,
    setSize: 1,
    source: 'TypeScript',
    type: 'error',
    uri: 'file:///test.ts',
  }

  const state = { ...createDefaultState(), problems: [mockProblem], focusedIndex: 0 }

  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => {},
  })

  const result = await copyMessage(state)

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'Test error message']])
  expect(result).toBe(state)
})

test('copyMessage should copy message from different problem index', async () => {
  const mockProblem1: Problem = {
    code: 'E1001',
    columnIndex: 10,
    count: 1,
    fileName: 'test1.ts',
    level: 1,
    listItemType: 1,
    message: 'First error message',
    posInSet: 1,
    relativePath: 'test1.ts',
    rowIndex: 5,
    setSize: 1,
    source: 'TypeScript',
    type: 'error',
    uri: 'file:///test1.ts',
  }

  const mockProblem2: Problem = {
    code: 'E1002',
    columnIndex: 15,
    count: 1,
    fileName: 'test2.ts',
    level: 2,
    listItemType: 1,
    message: 'Second error message',
    posInSet: 1,
    relativePath: 'test2.ts',
    rowIndex: 10,
    setSize: 1,
    source: 'TypeScript',
    type: 'warning',
    uri: 'file:///test2.ts',
  }

  const state = { ...createDefaultState(), problems: [mockProblem1, mockProblem2], focusedIndex: 1 }

  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => {},
  })

  const result = await copyMessage(state)

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'Second error message']])
  expect(result).toBe(state)
})
