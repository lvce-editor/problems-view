import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

export const getMenuEntriesFilter = (state: ProblemsState): readonly MenuEntry[] => {
  const { showErrors, showInfos, showWarnings } = state
  return [
    {
      command: 'Problems.toggleShowErrors',
      flags: showErrors ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
      id: 'show-errors',
      label: ProblemStrings.showErrors(),
    },
    {
      command: 'Problems.toggleShowWarnings',
      flags: showWarnings ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
      id: 'show-warnings',
      label: ProblemStrings.showWarnings(),
    },
    {
      command: 'Problems.toggleShowInfos',
      flags: showInfos ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
      id: 'show-infos',
      label: ProblemStrings.showInfos(),
    },
  ]
}
