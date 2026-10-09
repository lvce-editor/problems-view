import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsIconVirtualDom } from '../src/parts/GetProblemsIconVirtualDom/GetProblemsIconVirtualDom.ts'
import * as ProblemType from '../src/parts/ProblemType/ProblemType.ts'

test('getProblemsIconVirtualDom returns warning icon for warning type', () => {
  const result = getProblemsIconVirtualDom(ProblemType.Warning)
  expect(result).toEqual({
    childCount: 0,
    className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsWarningIcon}`,
    type: VirtualDomElements.Div,
  })
})

test('getProblemsIconVirtualDom returns error icon for error type', () => {
  const result = getProblemsIconVirtualDom(ProblemType.Error)
  expect(result).toEqual({
    childCount: 0,
    className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsErrorIcon}`,
    type: VirtualDomElements.Div,
  })
})

test('getProblemsIconVirtualDom returns error icon for other type', () => {
  const result = getProblemsIconVirtualDom(ProblemType.Other)
  expect(result).toEqual({
    childCount: 0,
    className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsErrorIcon}`,
    type: VirtualDomElements.Div,
  })
})

test('getProblemsIconVirtualDom returns error icon for unknown type', () => {
  const result = getProblemsIconVirtualDom(-1)
  expect(result).toEqual({
    childCount: 0,
    className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsErrorIcon}`,
    type: VirtualDomElements.Div,
  })
})
