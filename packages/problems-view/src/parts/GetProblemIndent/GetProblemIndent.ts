import * as GetTreeItemIndent from '../GetTreeItemIndent/GetTreeItemIndent.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

export const getProblemIndent = (listItemType: number): string => {
  const isGroup = listItemType === ProblemListItemType.Expanded || listItemType === ProblemListItemType.Collapsed
  const depth = isGroup ? 1 : 2
  return GetTreeItemIndent.getTreeItemIndent(depth)
}
