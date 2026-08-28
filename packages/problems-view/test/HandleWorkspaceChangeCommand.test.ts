import { expect, test } from '@jest/globals'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ProblemsStates from '../src/parts/ProblemsStates/ProblemsStates.ts'

test('clears stale problems when the workspace changes', async () => {
  const uid = 1
  const oldState = {
    ...createDefaultState(),
    activeUri: 'file:///old-workspace/settings.json',
    filteredProblems: [{ message: 'stale warning', uri: 'file:///old-workspace/settings.json' }] as any,
    listItems: [{ message: 'stale warning', uri: 'file:///old-workspace/settings.json' }] as any,
    message: 'Some problems have been detected in the workspace.',
    problems: [{ message: 'stale warning', uri: 'file:///old-workspace/settings.json' }] as any,
    uid,
    workspaceUri: 'file:///old-workspace',
  }
  ProblemsStates.set(uid, oldState, oldState)

  const handleWorkspaceChange = commandMap['Problems.handleWorkspaceChange']
  await handleWorkspaceChange(uid, 'file:///new-workspace')

  expect(ProblemsStates.get(uid).newState).toMatchObject({
    activeUri: '',
    filteredProblems: [],
    listItems: [],
    message: 'No problems have been detected in the workspace.',
    problems: [],
    workspaceUri: 'file:///new-workspace',
  })
})

test('preserves problems when the workspace path is unchanged', async () => {
  const uid = 2
  const state = {
    ...createDefaultState(),
    problems: [{ message: 'current warning', uri: 'file:///workspace/settings.json' }] as any,
    uid,
    workspaceUri: 'file:///workspace',
  }
  ProblemsStates.set(uid, state, state)

  const handleWorkspaceChange = commandMap['Problems.handleWorkspaceChange']
  await handleWorkspaceChange(uid, 'file:///workspace')

  expect(ProblemsStates.get(uid).newState).toBe(state)
})
