import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

export const getMenuEntriesFilter = (): readonly MenuEntry[] => [
  {
    command: 'Problems.filterByError',
    flags: MenuItemFlags.None,
    id: 'filterByError',
    label: ProblemStrings.error(),
  },
]
