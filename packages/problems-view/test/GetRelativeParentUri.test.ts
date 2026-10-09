import { expect, test } from '@jest/globals'
import { getRelativeParentUri } from '../src/parts/GetRelativeParentUri/GetRelativeParentUri.ts'

test.each([
  ['file:///workspace/src/file.ts', 'file:///workspace', 'src'],
  ['/workspace/src/file.ts', 'file:///workspace', 'src'],
  ['file:///workspace/file.ts', 'file:///workspace', ''],
  ['file:///workspace/src/file.ts', 'file:///workspace/', 'src'],
  ['file:///C:/workspace/src/file.ts', 'file:///C:/workspace', 'src'],
  ['C:/workspace/src/file.ts', 'file:///C:/workspace', 'src'],
  ['memfs:///workspace/src/file.ts', 'memfs:///workspace', 'src'],
  ['file:///workspace-other/src/file.ts', 'file:///workspace', 'workspace-other/src'],
  ['file:///outside/file.ts', '', 'outside'],
  ['file.ts', '', ''],
  ['live-component-state:///2.json', 'file:///workspace', ''],
  ['live-component-state:///2.json', '', ''],
])('getRelativeParentUri(%s, %s) returns %s', (uri, workspaceUri, expected) => {
  expect(getRelativeParentUri(uri, workspaceUri)).toBe(expected)
})
