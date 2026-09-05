import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderItems } from '../src/parts/RenderItems/RenderItems.ts'
import { toProblems } from '../src/parts/ToProblems/ToProblems.ts'

test('renderItems returns a ViewletCommand', () => {
  const state = { ...createDefaultState(), uid: 44 }
  const result = renderItems(state, state)
  expect(Array.isArray(result)).toBe(true)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBe(44)
})

test.each([
  ['file:///workspace/src/file.ts', 'src'],
  ['live-component-state:///2.json', ''],
])('renderItems derives the folder label for %s without storing relativePath', (uri, expectedLabel) => {
  const problems = toProblems([{ code: '', columnIndex: 0, listItemType: 0, message: 'error', rowIndex: 0, source: '', type: 'error', uri }])
  const state = { ...createDefaultState(), maxLineY: 2, problems, workspaceUri: 'file:///workspace' }
  const result = renderItems(state, state)
  const dom = result[2] as readonly { className?: string; text?: string }[]
  const labelIndex = dom.findIndex((node) => node.className === 'LabelDetail')
  expect(labelIndex).toBeGreaterThan(-1)
  expect(dom[labelIndex + 1].text).toBe(expectedLabel)
  for (const problem of problems) {
    expect(problem).not.toHaveProperty('relativePath')
  }
})
