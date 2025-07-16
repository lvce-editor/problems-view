import { test, expect } from '@jest/globals'
import { VirtualDomElements, AriaRoles, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { set } from '../src/parts/ProblemsStates/ProblemsStates.ts'
import { renderActions } from '../src/parts/RenderActions/RenderActions.ts'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'

test('renderActions should return virtual dom nodes', async (): Promise<void> => {
  const uid = 1
  const mockState: ProblemsState = {
    ...createDefaultState(),
    viewMode: ProblemsViewMode.Table,
    width: 800,
    problems: [],
    collapsedUris: [],
    focusedIndex: -2,
    filterValue: '',
    inputSource: 0,
  }

  // Set up the state in the registry
  set(uid, mockState, mockState)

  const result: readonly VirtualDomNode[] = renderActions(uid)

  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)

  // Check that the first element is a div with actions class
  const firstElement: VirtualDomNode = result[0]
  expect(firstElement.type).toBe(VirtualDomElements.Div)
  expect(firstElement.className).toBe(ClassNames.Actions)
  expect(firstElement.role).toBe(AriaRoles.ToolBar)
})