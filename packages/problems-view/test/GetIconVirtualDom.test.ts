import { test, expect } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import { getIconVirtualDom } from '../src/parts/GetIconVirtualDom/GetIconVirtualDom.ts'

test('getIconVirtualDom returns correct dom for default type', () => {
  const result = getIconVirtualDom('Error')
  expect(result).toEqual({
    childCount: 0,
    className: 'MaskIcon MaskIconError',
    role: AriaRoles.None,
    type: VirtualDomElements.Div,
  })
})

test('getIconVirtualDom returns correct dom for custom type', () => {
  const result = getIconVirtualDom('Warning', VirtualDomElements.Span)
  expect(result).toEqual({
    childCount: 0,
    className: 'MaskIcon MaskIconWarning',
    role: AriaRoles.None,
    type: VirtualDomElements.Span,
  })
})

test('getIconVirtualDom with empty icon', () => {
  const result = getIconVirtualDom('')
  expect(result).toEqual({
    childCount: 0,
    className: 'MaskIcon MaskIcon',
    role: AriaRoles.None,
    type: VirtualDomElements.Div,
  })
})
