import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getActionButtonVirtualDom } from '../src/parts/GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'

test('getActionButtonVirtualDom returns correct dom for action', () => {
  const action = {
    id: 'Test Action',
    icon: 'TestIcon',
    command: 'testCommand',
  }
  const result = getActionButtonVirtualDom(action)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Button,
    className: ClassNames.IconButton,
    title: 'Test Action',
    'data-command': 'testCommand',
    childCount: 1,
  })
  expect(result[1]).toMatchObject({
    type: VirtualDomElements.Div,
    className: 'MaskIcon MaskIconTestIcon',
    childCount: 0,
  })
})