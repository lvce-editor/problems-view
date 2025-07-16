import { test, expect, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { writeText } from '../src/parts/ClipBoard/ClipBoard.ts'

test('writeText calls writeClipBoardText with the provided text', async () => {
  const invoke = jest.fn((...args:readonly any[]) => undefined)
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const testText = 'test clipboard text'
  await writeText(testText)

  expect(invoke).toHaveBeenCalledWith('writeClipBoardText', testText)
})

test('writeText handles empty string', async () => {
  const invoke = jest.fn((...args:readonly any[]) => undefined)
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  await writeText('')

  expect(invoke).toHaveBeenCalledWith('writeClipBoardText', '')
})