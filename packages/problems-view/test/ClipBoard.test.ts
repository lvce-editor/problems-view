import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { writeText } from '../src/parts/ClipBoard/ClipBoard.ts'

test('writeText calls writeClipBoardText with the provided text', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => {},
  })

  const testText = 'test clipboard text'
  await writeText(testText)

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', testText]])
})

test('writeText handles empty string', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => {},
  })

  await writeText('')

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', '']])
})
