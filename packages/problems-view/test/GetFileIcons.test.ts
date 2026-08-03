import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import { getFileIcons } from '../src/parts/GetFileIcons/GetFileIcons.ts'

const createProblem = (uri: string, fileName: string): Problem => ({
  code: '',
  columnIndex: 0,
  count: 1,
  fileName,
  level: 1,
  listItemType: 1,
  message: '',
  posInSet: 1,
  relativePath: '',
  rowIndex: 0,
  setSize: 1,
  source: '',
  type: '',
  uri,
})

test('returns the existing cache when there are no problems', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => '/icons/file.svg',
  })
  const fileIconCache = { 'file:///cached.ts': '/icons/cached.svg' }

  await expect(getFileIcons([], fileIconCache)).resolves.toBe(fileIconCache)
  expect(mockRpc.invocations).toEqual([])
})

test('requests missing file icons and caches them by uri', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: Readonly<{ name: string }>) => `/icons/${name}.svg`,
  })
  const problems = [
    createProblem('file:///workspace/file1.ts', 'file1.ts'),
    createProblem('file:///workspace/file1.ts', 'file1.ts'),
    createProblem('file:///workspace/file2.js', 'file2.js'),
  ]

  const result = await getFileIcons(problems, {})

  expect(result).toEqual({
    'file:///workspace/file1.ts': '/icons/file1.ts.svg',
    'file:///workspace/file2.js': '/icons/file2.js.svg',
  })
  expect(mockRpc.invocations).toEqual([
    ['IconTheme.getFileIcon', { name: 'file1.ts' }],
    ['IconTheme.getFileIcon', { name: 'file2.js' }],
  ])
})

test('reuses cached icons and supports files without a name', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: Readonly<{ name: string }>) => `/icons/${name}.svg`,
  })
  const problems = [createProblem('file:///cached.ts', 'cached.ts'), createProblem('untitled:', '')]

  const result = await getFileIcons(problems, { 'file:///cached.ts': '/icons/cached.svg' })

  expect(result).toEqual({
    'file:///cached.ts': '/icons/cached.svg',
    'untitled:': '',
  })
  expect(mockRpc.invocations).toEqual([])
})
