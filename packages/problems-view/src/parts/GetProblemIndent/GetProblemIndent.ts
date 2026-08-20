import * as GetTreeItemIndent from '../GetTreeItemIndent/GetTreeItemIndent.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

export const getProblemIndent = (listItemType: number, level?: number): string => {
  const isGroup = listItemType === ProblemListItemType.Expanded || listItemType === ProblemListItemType.Collapsed
  const depth = isGroup ? 1 : Math.max(2, level || 2)
  return GetTreeItemIndent.getTreeItemIndent(depth)
}
