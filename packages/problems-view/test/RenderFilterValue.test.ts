import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { renderFilterValue } from '../src/parts/RenderFilterValue/RenderFilterValue.ts'

test('renderFilterValue returns correct ViewletCommand when filterValue changes', () => {
  const oldState: ProblemsState = createDefaultState()
  const newState: ProblemsState = {
    ...createDefaultState(),
    filterValue: 'test filter',
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 'filter', 'test filter'])
})

test('renderFilterValue returns correct ViewletCommand when filterValue is empty', () => {
  const oldState: ProblemsState = createDefaultState()
  const newState: ProblemsState = {
    ...createDefaultState(),
    filterValue: '',
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 'filter', ''])
})

test('renderFilterValue returns correct ViewletCommand when filterValue has special characters', () => {
  const oldState: ProblemsState = createDefaultState()
  const newState: ProblemsState = {
    ...createDefaultState(),
    filterValue: 'error: "unexpected token"',
    inputSource: InputSource.Script,
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 'filter-error%3A%20%22unexpected%20token%22', 'error: "unexpected token"'])
})
