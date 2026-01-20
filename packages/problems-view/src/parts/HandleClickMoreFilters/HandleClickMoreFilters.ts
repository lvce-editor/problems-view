import { MenuEntryId } from '@lvce-editor/constants'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleClickMoreFilters = async (state: ProblemsState, eventX: number, eventY: number): Promise<ProblemsState> => {
  const { uid } = state
  await ContextMenu.show2(uid, MenuEntryId.ProblemsFilter, eventX, eventY, {
    menuId: MenuEntryId.ProblemsFilter,
  })
  return state
}
