import { test, expect } from '@jest/globals'
import type { ViewletAction } from '../src/parts/ViewletAction/ViewletAction.ts'
import * as ActionType from '../src/parts/ActionType/ActionType.ts'
import { getActionVirtualDom } from '../src/parts/GetActionVirtualDom/GetActionVirtualDom.ts'

test('getActionVirtualDom returns empty array for unknown action type', () => {
  const action: ViewletAction = {
    command: 'testCommand',
    id: 'Test Action',
    type: ActionType.Select,
  }
  const result = getActionVirtualDom(action)
  expect(result).toEqual([])
})
