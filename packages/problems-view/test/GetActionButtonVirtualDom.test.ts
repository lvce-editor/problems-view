import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getActionButtonVirtualDom } from '../src/parts/GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'

test('getActionButtonVirtualDom returns correct dom for action', () => {
  const action = {
    command: 'testCommand',
    icon: 'TestIcon',
    id: 'Test Action',
  }
  const result = getActionButtonVirtualDom(action)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.IconButton,
    'data-command': 'testCommand',
    title: 'Test Action',
    type: VirtualDomElements.Button,
  })
  expect(result[1]).toMatchObject({
    childCount: 0,
    className: 'MaskIcon MaskIconTestIcon',
    type: VirtualDomElements.Div,
  })
})
