import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getActionButtonVirtualDom } from '../src/parts/GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'

test('getActionButtonVirtualDom returns correct dom for action', () => {
  const action = {
    command: DomEventListenerFunctions.HandleCollapseAll,
    icon: 'TestIcon',
    id: 'Test Action',
    name: 'collapseAll',
  }
  const result = getActionButtonVirtualDom(action)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.IconButton,
    name: 'collapseAll',
    onClick: DomEventListenerFunctions.HandleCollapseAll,
    title: 'Test Action',
    type: VirtualDomElements.Button,
  })
  expect(result[1]).toMatchObject({
    childCount: 0,
    className: 'MaskIcon MaskIconTestIcon',
    type: VirtualDomElements.Div,
  })
})
