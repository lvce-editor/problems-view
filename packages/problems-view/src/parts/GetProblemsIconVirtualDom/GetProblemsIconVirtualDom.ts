import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DiagnosticType from '../DiagnosticType/DiagnosticType.ts'

export const getProblemsIconVirtualDom = (type: string): VirtualDomNode => {
  if (type === DiagnosticType.Warning) {
    return {
      childCount: 0,
      className: mergeClassNames(ClassNames.ProblemsIcon, ClassNames.ProblemsWarningIcon),
      type: VirtualDomElements.Div,
    }
  }
  return {
    childCount: 0,
    className: mergeClassNames(ClassNames.ProblemsIcon, ClassNames.ProblemsErrorIcon),
    type: VirtualDomElements.Div,
  }
}
