import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getChevronDownVirtualDom, getChevronRightVirtualDom } from '../src/parts/GetChevronVirtualDom/GetChevronVirtualDom.ts'

test('getChevronDownVirtualDom returns correct dom structure', () => {
  const dom = getChevronDownVirtualDom('extra')
  expect(dom).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.Chevron} MaskIconChevronDown extra`,
    childCount: 0,
  })
})

test('getChevronRightVirtualDom returns correct dom structure', () => {
  const dom = getChevronRightVirtualDom('extra')
  expect(dom).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.Chevron} MaskIconChevronRight extra`,
    childCount: 0,
  })
})
