import { expect, test } from '@jest/globals'
import { mockWorkerGlobalRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { initializeEditorWorkerRpc } from '../src/parts/InitializeEditorWorkerRpc/InitializeEditorWorkerRpc.ts'

test('initializeEditorWorkerRpc creates and returns RPC successfully', async () => {
  const { dispose, start } = mockWorkerGlobalRpc()
  start()

  RendererWorker.registerMockRpc({
    'Renderer.sendMessagePortToEditorWorker': async () => {},
  })

  try {
    const result = await initializeEditorWorkerRpc()

    expect(result).toBeDefined()
    expect(result.invoke).toBeDefined()
    expect(typeof result.invoke).toBe('function')
  } finally {
    dispose()
  }
})

test('initializeEditorWorkerRpc returns RPC with invoke method', async () => {
  const { dispose, start } = mockWorkerGlobalRpc()
  start()

  RendererWorker.registerMockRpc({
    'Renderer.sendMessagePortToEditorWorker': async () => {},
  })

  try {
    const result = await initializeEditorWorkerRpc()

    expect(result).toBeDefined()
    expect(result.invoke).toBeDefined()
    expect(typeof result.invoke).toBe('function')
  } finally {
    dispose()
  }
})

test('initializeEditorWorkerRpc can be called multiple times', async () => {
  const { dispose, start } = mockWorkerGlobalRpc()
  start()

  RendererWorker.registerMockRpc({
    'Renderer.sendMessagePortToEditorWorker': async () => {},
  })

  try {
    const result1 = await initializeEditorWorkerRpc()
    const result2 = await initializeEditorWorkerRpc()

    expect(result1).toBeDefined()
    expect(result2).toBeDefined()
    expect(result1.invoke).toBeDefined()
    expect(result2.invoke).toBeDefined()
  } finally {
    dispose()
  }
})

test('initializeEditorWorkerRpc sets up mockRpc correctly', async () => {
  const { dispose, start } = mockWorkerGlobalRpc()
  start()

  const mockRpc = RendererWorker.registerMockRpc({
    'Renderer.sendMessagePortToEditorWorker': async () => {},
  })

  try {
    await initializeEditorWorkerRpc()

    expect(mockRpc.invocations).toBeDefined()
    expect(Array.isArray(mockRpc.invocations)).toBe(true)
  } finally {
    dispose()
  }
})
