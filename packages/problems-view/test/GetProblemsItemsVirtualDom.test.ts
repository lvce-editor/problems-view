import { test, expect } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../src/parts/VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getNoResultsWithFilterVirtualDom } from '../src/parts/GetNoResultsWithFilterVirtualDom/GetNoResultsWithFilterVirtualDom.ts'
import { getProblemsVirtualDom } from '../src/parts/GetProblemsItemsVirtualDom/GetProblemsItemsVirtualDom.ts'
import * as GetProblemsListVirtualDom from '../src/parts/GetProblemsListVirtualDom/GetProblemsListVirtualDom.ts'
import * as GetProblemsNoProblemsFoundVirtualDom from '../src/parts/GetProblemsNoProblemsFoundVirtualDom/GetProblemsNoProblemsFoundVirtualDom.ts'
import * as GetProblemsTableVirtualDom from '../src/parts/GetProblemsTableVirtualDom/GetProblemsTableVirtualDom.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'

test('getProblemsVirtualDom returns message when problems.length === 0 && message is truthy', () => {
  const problems: readonly VisibleProblem[] = []
  const viewMode = ProblemsViewMode.Table
  const filterValue = ''
  const message = 'Test message'
  const result = getProblemsVirtualDom(viewMode, problems, filterValue, message)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.Message,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual(text(message))
})

test('getProblemsVirtualDom returns no results with filter when problems.length === 0 && filterValue is truthy', () => {
  const problems: readonly VisibleProblem[] = []
  const viewMode = ProblemsViewMode.Table
  const filterValue = 'test filter'
  const message = ''
  const result = getProblemsVirtualDom(viewMode, problems, filterValue, message)

  const expectedNoResults = getNoResultsWithFilterVirtualDom()
  expect(result).toEqual(expectedNoResults)
})

test('getProblemsVirtualDom returns table view when viewMode === ProblemsViewMode.Table', () => {
  const problems: readonly VisibleProblem[] = [
    {
      code: 'TS1234',
      columnIndex: 1,
      count: 1,
      fileName: '',
      filterValueLength: 0,
      icon: 'error',
      isActive: false,
      isCollapsed: false,
      isEven: true,
      level: 1,
      listItemType: 1,
      message: 'Test error message',
      messageMatchIndex: -1,
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      sourceMatchIndex: -1,
      type: 'error',
      uri: '/test/file.ts',
      uriMatchIndex: -1,
    },
  ]
  const viewMode = ProblemsViewMode.Table
  const filterValue = ''
  const message = ''
  const result = getProblemsVirtualDom(viewMode, problems, filterValue, message)

  const expectedTable = GetProblemsTableVirtualDom.getProblemsTableVirtualDom(problems)
  expect(result).toEqual(expectedTable)
})

test('getProblemsVirtualDom returns list view when viewMode !== ProblemsViewMode.Table', () => {
  const problems: readonly VisibleProblem[] = [
    {
      code: 'TS1234',
      columnIndex: 1,
      count: 1,
      fileName: '',
      filterValueLength: 0,
      icon: 'error',
      isActive: false,
      isCollapsed: false,
      isEven: true,
      level: 1,
      listItemType: 1,
      message: 'Test error message',
      messageMatchIndex: -1,
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      sourceMatchIndex: -1,
      type: 'error',
      uri: '/test/file.ts',
      uriMatchIndex: -1,
    },
  ]
  const viewMode = ProblemsViewMode.List
  const filterValue = ''
  const message = ''
  const result = getProblemsVirtualDom(viewMode, problems, filterValue, message)

  const expectedList = GetProblemsListVirtualDom.getProblemsListVirtualDom(problems)
  expect(result).toEqual(expectedList)
})

test('getProblemsVirtualDom returns no problems found when problems.length === 0 && no filterValue && no message', () => {
  const problems: readonly VisibleProblem[] = []
  const viewMode = ProblemsViewMode.Table
  const filterValue = ''
  const message = ''
  const result = getProblemsVirtualDom(viewMode, problems, filterValue, message)

  const expectedNoProblems = GetProblemsNoProblemsFoundVirtualDom.getProblemsNoProblemsFoundVirtualDom()
  expect(result).toEqual(expectedNoProblems)
})
