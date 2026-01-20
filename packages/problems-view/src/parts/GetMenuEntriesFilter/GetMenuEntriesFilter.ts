import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

export const getMenuEntriesFilter = (): readonly MenuEntry[] => {
  return [
    {
      command: 'Problems.filterByError',
      flags: MenuItemFlags.None,
      id: 'filterByError',
      label: ProblemStrings.error(),
    },
  ]
}
