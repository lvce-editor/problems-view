import { mergeClassNames } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetProblemIndent from '../GetProblemIndent/GetProblemIndent.ts'

export const getProblemClassName = (listItemType: number, level: number, isActive: boolean): string => {
  let className = ClassNames.Problem
  const indent = GetProblemIndent.getProblemIndent(listItemType, level)
  className = mergeClassNames(className, `Indent-${indent}`)
  if (isActive) {
    className = mergeClassNames(className, ClassNames.ProblemSelected)
  }
  return className
}
