import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleIconThemeChange } from '../src/parts/HandleIconThemeChange/HandleIconThemeChange.ts'

test('rebuilds file icons for the current problems', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: Readonly<{ name: string }>) => `/new-theme/${name}.svg`,
  })
  const problems = [
    { fileName: 'file1.ts', uri: 'file:///file1.ts' },
    { fileName: 'file1.ts', uri: 'file:///file1.ts' },
    { fileName: 'file2.js', uri: 'file:///file2.js' },
  ] as any
  const state = {
    ...createDefaultState(),
    fileIconCache: { 'file:///file1.ts': '/old-theme/file1.svg' },
    problems,
  }

  const result = await handleIconThemeChange(state)

  expect(result).not.toBe(state)
  expect(result.problems).toBe(problems)
  expect(result.fileIconCache).toEqual({
    'file:///file1.ts': '/new-theme/file1.ts.svg',
    'file:///file2.js': '/new-theme/file2.js.svg',
  })
  expect(mockRpc.invocations).toEqual([
    ['IconTheme.getFileIcon', { name: 'file1.ts' }],
    ['IconTheme.getFileIcon', { name: 'file2.js' }],
  ])
})

test('clears stale icons when there are no problems', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => '/icons/file.svg',
  })
  const state = {
    ...createDefaultState(),
    fileIconCache: { 'file:///stale.ts': '/old-theme/stale.svg' },
  }

  const result = await handleIconThemeChange(state)

  expect(result.fileIconCache).toEqual({})
  expect(mockRpc.invocations).toEqual([])
})
