import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export const getMenuEntriesFilter = (): readonly MenuEntry[] => [
  {
    command: '-1',
    flags: MenuItemFlags.None,
    id: 'show-errors',
    label: 'Show Errors',
  },
  {
    command: '-1',
    flags: MenuItemFlags.None,
    id: 'show-warnings',
    label: 'Show Warnings',
  },
  {
    command: '-1',
    flags: MenuItemFlags.None,
    id: 'show-infos',
    label: 'Show Infos',
  },
]
