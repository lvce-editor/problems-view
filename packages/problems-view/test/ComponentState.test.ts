import { beforeEach, expect, test } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff2 } from '../src/parts/Diff2/Diff2.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as ProblemsStates from '../src/parts/ProblemsStates/ProblemsStates.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'
import { render2 } from '../src/parts/Render2/Render2.ts'
import { toProblems } from '../src/parts/ToProblems/ToProblems.ts'

const uid = 42

beforeEach(() => {
  const state = { ...createDefaultState(), uid }
  ProblemsStates.set(uid, state, state)
})

test('gets the current worker state instead of the last rendered state', () => {
  const { oldState } = ProblemsStates.get(uid)
  const newState = { ...oldState, filterValue: 'current filter' }
  ProblemsStates.set(uid, oldState, newState)

  expect(commandMap['Problems.getComponentState'](uid)).toEqual(newState)
})

test('gets the current virtual DOM from the component state', () => {
  const dom = commandMap['Problems.getComponentDom'](uid)

  expect(dom).toEqual(expect.arrayContaining([expect.objectContaining({ className: 'Viewlet Problems' })]))
})

test('gets the populated virtual DOM from the component state', () => {
  const { oldState } = ProblemsStates.get(uid)
  const problems = toProblems([
    { code: '', columnIndex: 0, listItemType: 0, message: 'problem', rowIndex: 0, source: '', type: 'error', uri: 'file:///workspace/file.ts' },
  ])
  ProblemsStates.set(uid, oldState, { ...oldState, maxLineY: 2, problems, viewMode: ProblemsViewMode.List })

  const dom = commandMap['Problems.getComponentDom'](uid)

  expect(dom).toEqual(expect.arrayContaining([expect.objectContaining({ className: 'ProblemsList' })]))
})

test('sets the full component state and renders the changed filter', async () => {
  const { oldState } = ProblemsStates.get(uid)
  const newState = { ...oldState, filterValue: 'live filter', inputSource: InputSource.Script }

  await commandMap['Problems.setComponentState'](uid, newState)

  expect(ProblemsStates.get(uid)).toMatchObject({ newState, oldState })
  expect(commandMap['Problems.getComponentState'](uid)).toEqual(newState)
  const commands = await render2(uid, diff2(uid))
  expect(commands).toContainEqual(['Viewlet.setValueByName', uid, 'ProblemsInput', 'live filter'])
})

test.each([null, [], 'invalid', 1])('rejects invalid component state %p without changing state', async (value: unknown) => {
  const before = ProblemsStates.get(uid)

  await expect(commandMap['Problems.setComponentState'](uid, value as ProblemsState)).rejects.toThrow('Problems state must be an object')

  expect(ProblemsStates.get(uid)).toEqual(before)
})

test('rejects a changed uid without changing state', async () => {
  const before = ProblemsStates.get(uid)

  await expect(commandMap['Problems.setComponentState'](uid, { ...before.newState, uid: 43 })).rejects.toThrow('Problems state uid must remain 42')

  expect(ProblemsStates.get(uid)).toEqual(before)
})
