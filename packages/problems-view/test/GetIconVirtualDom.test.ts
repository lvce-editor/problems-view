import { test, expect } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import { getIconVirtualDom } from '../src/parts/GetIconVirtualDom/GetIconVirtualDom.ts'

test('getIconVirtualDom returns correct dom for default type', () => {
  const result = getIconVirtualDom('Error')
  expect(result).toEqual({
    type: VirtualDomElements.Div,
    className: 'MaskIcon MaskIconError',
    role: AriaRoles.None,
    childCount: 0,
  })
})

test('getIconVirtualDom returns correct dom for custom type', () => {
  const result = getIconVirtualDom('Warning', VirtualDomElements.Span)
  expect(result).toEqual({
    type: VirtualDomElements.Span,
    className: 'MaskIcon MaskIconWarning',
    role: AriaRoles.None,
    childCount: 0,
  })
})

test('getIconVirtualDom with empty icon', () => {
  const result = getIconVirtualDom('')
  expect(result).toEqual({
    type: VirtualDomElements.Div,
    className: 'MaskIcon MaskIcon',
    role: AriaRoles.None,
    childCount: 0,
  })
})