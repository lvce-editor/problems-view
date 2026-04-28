import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsNoProblemsFoundVirtualDom } from '../src/parts/GetProblemsNoProblemsFoundVirtualDom/GetProblemsNoProblemsFoundVirtualDom.ts'

test('getProblemsNoProblemsFoundVirtualDom with empty filterValue', () => {
  const dom = getProblemsNoProblemsFoundVirtualDom()
  const expectedArray = [
    {
      childCount: 1,
      className: ClassNames.Message,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'No problems have been detected in the workspace.',
      type: VirtualDomElements.Text,
    },
  ]
  expect(dom).toEqual(expectedArray)
})

test.todo('getProblemsNoProblemsFoundVirtualDom with non-empty filterValue')
