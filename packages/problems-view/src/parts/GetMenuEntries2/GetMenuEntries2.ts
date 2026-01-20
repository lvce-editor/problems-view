import { MenuEntryId } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import { getMenuEntriesFilter } from '../GetMenuEntriesFilter/GetMenuEntriesFilter.ts'

export const getMenuEntries2 = (state: ProblemsState, props: ContextMenuProps): readonly MenuEntry[] => {
  const { menuId } = props
  switch (menuId) {
    case MenuEntryId.ProblemsFilter:
      return getMenuEntriesFilter(state)
    default:
      return []
  }
}
