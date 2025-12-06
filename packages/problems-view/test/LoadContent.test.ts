import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent returns a new state with expected properties', async () => {
  const state = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result).toMatchObject({
    collapsedUris: [],
    filteredProblems: [],
    filterValue: '',
    inputSource: expect.any(Number),
    listItems: [],
    message: expect.any(String),
    problems: [],
    viewMode: expect.any(Number),
  })
})
