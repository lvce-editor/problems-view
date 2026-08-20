import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'

export const handleIconThemeChange = async (state: ProblemsState): Promise<ProblemsState> => {
  const { problems } = state
  const fileIconCache = await GetFileIcons.getFileIcons(problems, {})
  return {
    ...state,
    fileIconCache,
  }
}
