import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const handleContextMenu = async (state: ProblemsState, eventX: number, eventY: number): Promise<ProblemsState> => {
  // @ts-ignore
  // await ContextMenu.show(eventX, eventY, MenuEntryId.Problems)
  return state
}
