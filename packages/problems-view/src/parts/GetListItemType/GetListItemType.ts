import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

export const getListItemType = (listItemType: number, isCollapsed: boolean): number => {
  if (listItemType === ProblemListItemType.Item) {
    return ProblemListItemType.Item
  }
  if (isCollapsed) {
    return ProblemListItemType.Collapsed
  }
  return ProblemListItemType.Expanded
}
