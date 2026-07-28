import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DiagnosticType from '../DiagnosticType/DiagnosticType.ts'

const warningIconNode: VirtualDomNode = {
  childCount: 0,
  className: mergeClassNames(ClassNames.ProblemsIcon, ClassNames.ProblemsWarningIcon),
  type: VirtualDomElements.Div,
}

const errorIconNode: VirtualDomNode = {
  childCount: 0,
  className: mergeClassNames(ClassNames.ProblemsIcon, ClassNames.ProblemsErrorIcon),
  type: VirtualDomElements.Div,
}

export const getProblemsIconVirtualDom = (type: string): VirtualDomNode => {
  if (type === DiagnosticType.Warning) {
    return warningIconNode
  }
  return errorIconNode
}
