import { expect, test } from '@jest/globals'
import { getProblemsVirtualDom } from '../src/parts/GetProblemsVirtualDom/GetProblemsVirtualDom.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'

test('getProblemsVirtualDom includes the filter and items as root children at small widths', () => {
  const dom = getProblemsVirtualDom('file:///active.ts', ProblemsViewMode.List, [], 'restored filter', InputSource.Script, true, 'No problems')

  expect(dom[0].childCount).toBe(2)
  expect(dom[0]['data-activeUri']).toBe('file:///active.ts')
  expect(dom[2].name).toBe('filter-restored%20filter')
  expect(dom[2].value).toBe('restored filter')
})

test('getProblemsVirtualDom includes only the items as a root child at large widths', () => {
  const dom = getProblemsVirtualDom('', ProblemsViewMode.List, [], '', InputSource.User, false, 'No problems')

  expect(dom[0].childCount).toBe(1)
})
