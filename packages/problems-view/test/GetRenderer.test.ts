import { test, expect } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import { getRenderer } from '../src/parts/GetRenderer/GetRenderer.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('getRenderer returns renderCss for DiffType.RenderCss', () => {
  const renderer = getRenderer(DiffType.RenderCss)
  expect(renderer).toBe(renderCss)
})

test('getRenderer returns renderItems for DiffType.RenderItems', () => {
  const renderer = getRenderer(DiffType.RenderItems)
  expect(renderer).toBe(RenderItems.renderItems)
})

test('getRenderer throws for unknown diffType', () => {
  expect(() => getRenderer(999)).toThrow('unknown renderer')
})
