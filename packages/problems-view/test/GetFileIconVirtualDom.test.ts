import { test, expect } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getFileIconVirtualDom } from '../src/parts/GetFileIconVirtualDom/GetFileIconVirtualDom.ts'

test('getFileIconVirtualDom returns correct virtual dom node', () => {
  const icon = 'test-icon.png'
  const result = getFileIconVirtualDom(icon)
  expect(result).toEqual({
    type: 17,
    className: ClassNames.FileIcon,
    src: icon,
    role: 'none',
    childCount: 0,
  })
})
