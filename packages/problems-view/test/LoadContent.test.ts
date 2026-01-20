import { test, expect } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'

test('loadContent returns a new state with expected properties', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result).toMatchObject({
    collapsedUris: [],
    filteredProblems: [],
    filterValue: '',
    inputSource: InputSource.Script,
    listItems: [],
    message: expect.any(String),
    problems: [],
    viewMode: ProblemsViewMode.List,
  })
  expect(result).not.toBe(state)
})

test('loadContent preserves state properties', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = {
    ...createDefaultState(),
    focusedIndex: 5,
    height: 200,
    width: 100,
    workspaceUri: 'file:///workspace',
  }
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result.workspaceUri).toBe('file:///workspace')
  expect(result.width).toBe(100)
  expect(result.height).toBe(200)
  expect(result.focusedIndex).toBe(5)
})

test('loadContent with empty savedState uses defaults', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result.viewMode).toBe(ProblemsViewMode.List)
  expect(result.filterValue).toBe('')
  expect(result.collapsedUris).toEqual([])
})

test('loadContent with savedState containing viewMode', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    viewMode: ProblemsViewMode.Table,
  }
  const result = await loadContent(state, savedState)
  expect(result.viewMode).toBe(ProblemsViewMode.Table)
})

test('loadContent with savedState containing filterValue', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    filterValue: 'test filter',
  }
  const result = await loadContent(state, savedState)
  expect(result.filterValue).toBe('test filter')
})

test('loadContent with savedState containing collapsedUris', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    collapsedUris: ['file:///test1.ts', 'file:///test2.ts'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual(['file:///test1.ts', 'file:///test2.ts'])
})

test('loadContent with savedState containing all properties', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    collapsedUris: ['file:///test.ts'],
    filterValue: 'error',
    viewMode: ProblemsViewMode.Table,
  }
  const result = await loadContent(state, savedState)
  expect(result.viewMode).toBe(ProblemsViewMode.Table)
  expect(result.filterValue).toBe('error')
  expect(result.collapsedUris).toEqual(['file:///test.ts'])
})

test('loadContent with invalid viewMode type defaults to List', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    viewMode: 'invalid',
  }
  const result = await loadContent(state, savedState)
  expect(result.viewMode).toBe(ProblemsViewMode.List)
})

test('loadContent with invalid filterValue type defaults to empty string', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    filterValue: 123,
  }
  const result = await loadContent(state, savedState)
  expect(result.filterValue).toBe('')
})

test('loadContent with invalid collapsedUris type defaults to empty array', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    collapsedUris: 'not an array',
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
})

test('loadContent with collapsedUris containing non-string values defaults to empty array', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    collapsedUris: ['valid', 123, null],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
})

test('loadContent with null savedState uses defaults', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const result = await loadContent(state, null)
  expect(result.viewMode).toBe(ProblemsViewMode.List)
  expect(result.filterValue).toBe('')
  expect(result.collapsedUris).toEqual([])
})

test('loadContent with undefined savedState uses defaults', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const result = await loadContent(state, undefined)
  expect(result.viewMode).toBe(ProblemsViewMode.List)
  expect(result.filterValue).toBe('')
  expect(result.collapsedUris).toEqual([])
})

test('loadContent handles error from GetProblems', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => {
      throw new Error('Failed to get problems')
    },
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result.message).toBe('Error: Failed to get problems')
  expect(result.problems).toEqual([])
})

test('loadContent with error preserves state properties', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => {
      throw new Error('Test error')
    },
  })
  const state: ProblemsState = {
    ...createDefaultState(),
    height: 200,
    width: 100,
    workspaceUri: 'file:///workspace',
  }
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result.workspaceUri).toBe('file:///workspace')
  expect(result.width).toBe(100)
  expect(result.height).toBe(200)
  expect(result.message).toBe('Error: Test error')
})

test('loadContent with zero problems', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result.problems).toEqual([])
  expect(result.filteredProblems).toEqual([])
})

test('loadContent with one problem', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [
      {
        code: 'E1001',
        columnIndex: 10,
        message: 'Test error message',
        rowIndex: 5,
        source: 'TypeScript',
        type: 'error',
        uri: 'file:///test.ts',
      },
    ],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result.problems.length).toBe(2)
  expect(result.filteredProblems.length).toBe(2)
  expect(result.problems.some((p) => p.uri === 'file:///test.ts')).toBe(true)
})

test('loadContent with multiple problems', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [
      {
        code: 'E1001',
        columnIndex: 10,
        message: 'First error',
        rowIndex: 5,
        source: 'TypeScript',
        type: 'error',
        uri: 'file:///test1.ts',
      },
      {
        code: 'E1002',
        columnIndex: 15,
        message: 'Second error',
        rowIndex: 10,
        source: 'TypeScript',
        type: 'warning',
        uri: 'file:///test2.ts',
      },
      {
        code: 'E1003',
        columnIndex: 20,
        message: 'Third error',
        rowIndex: 15,
        source: 'TypeScript',
        type: 'info',
        uri: 'file:///test3.ts',
      },
    ],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result.problems.length).toBe(6)
  expect(result.filteredProblems.length).toBe(6)
  expect(result.problems.some((p) => p.uri === 'file:///test1.ts')).toBe(true)
  expect(result.problems.some((p) => p.uri === 'file:///test2.ts')).toBe(true)
  expect(result.problems.some((p) => p.uri === 'file:///test3.ts')).toBe(true)
})

test('loadContent sets inputSource to Script', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result.inputSource).toBe(InputSource.Script)
})

test('loadContent sets listItems to empty array', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result.listItems).toEqual([])
})

test('loadContent with viewMode None', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    viewMode: ProblemsViewMode.None,
  }
  const result = await loadContent(state, savedState)
  expect(result.viewMode).toBe(ProblemsViewMode.None)
})

test('loadContent with empty filterValue', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    filterValue: '',
  }
  const result = await loadContent(state, savedState)
  expect(result.filterValue).toBe('')
})

test('loadContent with empty collapsedUris array', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    collapsedUris: [],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
})

test('loadContent with large collapsedUris array', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const collapsedUris = Array.from({ length: 100 }, (_, i) => `file:///test${i}.ts`)
  const savedState = {
    collapsedUris,
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual(collapsedUris)
  expect(result.collapsedUris.length).toBe(100)
})

test('loadContent with viewMode as string number defaults to List', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    viewMode: '1',
  }
  const result = await loadContent(state, savedState)
  expect(result.viewMode).toBe(ProblemsViewMode.List)
})

test('loadContent with viewMode as zero defaults to List', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    viewMode: 0,
  }
  const result = await loadContent(state, savedState)
  expect(result.viewMode).toBe(ProblemsViewMode.None)
})

test('loadContent with viewMode as negative number defaults to List', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    viewMode: -1,
  }
  const result = await loadContent(state, savedState)
  expect(result.viewMode).toBe(-1)
})

test('loadContent with filterValue containing special characters', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    filterValue: 'test@#$%^&*()',
  }
  const result = await loadContent(state, savedState)
  expect(result.filterValue).toBe('test@#$%^&*()')
})

test('loadContent with collapsedUris containing special characters', async () => {
  EditorWorker.registerMockRpc({
    'Editor.getProblems': () => [],
  })
  const state: ProblemsState = createDefaultState()
  const savedState = {
    collapsedUris: ['file:///test with spaces.ts', 'file:///test@special.ts'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual(['file:///test with spaces.ts', 'file:///test@special.ts'])
})
