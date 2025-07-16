import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DiagnosticType from '../src/parts/DiagnosticType/DiagnosticType.ts'
import { getProblemsIconVirtualDom } from '../src/parts/GetProblemsIconVirtualDom/GetProblemsIconVirtualDom.ts'

test('getProblemsIconVirtualDom returns warning icon for warning type', () => {
  const result = getProblemsIconVirtualDom(DiagnosticType.Warning)
  expect(result).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsWarningIcon}`,
    childCount: 0,
  })
})

test('getProblemsIconVirtualDom returns error icon for error type', () => {
  const result = getProblemsIconVirtualDom(DiagnosticType.Error)
  expect(result).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsErrorIcon}`,
    childCount: 0,
  })
})

test('getProblemsIconVirtualDom returns error icon for other type', () => {
  const result = getProblemsIconVirtualDom(DiagnosticType.Other)
  expect(result).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsErrorIcon}`,
    childCount: 0,
  })
})

test('getProblemsIconVirtualDom returns error icon for unknown type', () => {
  const result = getProblemsIconVirtualDom('unknown')
  expect(result).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsErrorIcon}`,
    childCount: 0,
  })
})
