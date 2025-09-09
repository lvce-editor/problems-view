import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DiagnosticType from '../DiagnosticType/DiagnosticType.ts'

export const getProblemsIconVirtualDom = (type: string): VirtualDomNode => {
  if (type === DiagnosticType.Warning) {
    return {
      type: VirtualDomElements.Div,
      className: mergeClassNames(ClassNames.ProblemsIcon, ClassNames.ProblemsWarningIcon),
      childCount: 0,
    }
  }
  return {
    type: VirtualDomElements.Div,
    className: mergeClassNames(ClassNames.ProblemsIcon, ClassNames.ProblemsErrorIcon),
    childCount: 0,
  }
}
