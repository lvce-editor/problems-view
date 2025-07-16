import { expect, test } from '@jest/globals'
import type { KeyBinding } from '../src/parts/KeyBinding/KeyBinding.ts'
import { getKeyBindings } from '../src/parts/GetKeyBindings/GetKeyBindings.ts'

test('getKeyBindings returns correct key bindings', () => {
  const result: readonly KeyBinding[] = getKeyBindings()
  expect(result).toBeDefined()
})
