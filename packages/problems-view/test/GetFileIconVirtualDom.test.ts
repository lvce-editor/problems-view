import { test, expect } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getFileIconVirtualDom } from '../src/parts/GetFileIconVirtualDom/GetFileIconVirtualDom.ts'

// These values are assumed based on typical conventions
const IMG_TYPE = 3 // VirtualDomElements.Img
const ARIA_NONE = 0 // AriaRoles.None

test('getFileIconVirtualDom returns correct virtual dom node', () => {
  const icon = 'test-icon.png'
  const result = getFileIconVirtualDom(icon)
  expect(result).toEqual({
    type: IMG_TYPE,
    className: ClassNames.FileIcon,
    src: icon,
    role: ARIA_NONE,
    childCount: 0,
  })
})