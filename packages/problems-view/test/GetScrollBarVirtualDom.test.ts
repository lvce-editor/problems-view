import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getScrollBarVirtualDom } from '../src/parts/GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'

test('getScrollBarVirtualDom hides an unnecessary scrollbar', () => {
  expect(getScrollBarVirtualDom(0, false)).toEqual([])
})

test('getScrollBarVirtualDom renders the scrollbar and thumb', () => {
  expect(getScrollBarVirtualDom(40, false)).toEqual([
    {
      childCount: 1,
      className: `${ClassNames.ScrollBar} ${ClassNames.ScrollBarSmall}`,
      onPointerDown: DomEventListenerFunctions.HandleScrollBarPointerDown,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.ScrollBarThumb,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getScrollBarVirtualDom marks the thumb active while dragging', () => {
  const dom = getScrollBarVirtualDom(40, true)

  expect(dom[1].className).toBe(`${ClassNames.ScrollBarThumb} ${ClassNames.ScrollBarThumbActive}`)
})
