import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

const messageNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Message,
  type: VirtualDomElements.Div,
}

export const getProblemsNoProblemsFoundVirtualDom = (): readonly VirtualDomNode[] => {
  return [messageNode, text(ProblemStrings.noProblemsDetected())]
}
