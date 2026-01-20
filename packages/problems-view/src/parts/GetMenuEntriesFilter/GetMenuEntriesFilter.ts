import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

export const getMenuEntriesFilter = (): readonly MenuEntry[] => [
  {
    command: '-1',
    flags: MenuItemFlags.None,
    id: 'show-errors',
    label: ProblemStrings.showErrors(),
  },
  {
    command: '-1',
    flags: MenuItemFlags.None,
    id: 'show-warnings',
    label: ProblemStrings.showWarnings(),
  },
  {
    command: '-1',
    flags: MenuItemFlags.None,
    id: 'show-infos',
    label: ProblemStrings.showInfos(),
  },
]
