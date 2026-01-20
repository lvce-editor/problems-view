import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

export const getMenuEntriesFilter = (state: ProblemsState): readonly MenuEntry[] => [
  {
    command: '-1',
    flags: state.showErrors ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
    id: 'show-errors',
    label: ProblemStrings.showErrors(),
  },
  {
    command: '-1',
    flags: state.showWarnings ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
    id: 'show-warnings',
    label: ProblemStrings.showWarnings(),
  },
  {
    command: '-1',
    flags: state.showInfos ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
    id: 'show-infos',
    label: ProblemStrings.showInfos(),
  },
]
