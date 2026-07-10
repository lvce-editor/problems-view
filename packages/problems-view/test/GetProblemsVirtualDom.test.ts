import { expect, test } from '@jest/globals'
import { getProblemsVirtualDom } from '../src/parts/GetProblemsVirtualDom/GetProblemsVirtualDom.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'

test('getProblemsVirtualDom includes the filter and items as root children at small widths', () => {
  const dom = getProblemsVirtualDom(ProblemsViewMode.List, [], '', true, 'No problems')

  expect(dom[0].childCount).toBe(2)
})

test('getProblemsVirtualDom includes only the items as a root child at large widths', () => {
  const dom = getProblemsVirtualDom(ProblemsViewMode.List, [], '', false, 'No problems')

  expect(dom[0].childCount).toBe(1)
})
