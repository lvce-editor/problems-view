import { test, expect } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getFileIconVirtualDom } from '../src/parts/GetFileIconVirtualDom/GetFileIconVirtualDom.ts'

test('getFileIconVirtualDom returns correct virtual dom node', () => {
  const icon = 'test-icon.png'
  const result = getFileIconVirtualDom(icon)
  expect(result).toEqual({
    childCount: 0,
    className: ClassNames.FileIcon,
    role: 'none',
    src: icon,
    type: 17,
  })
})
