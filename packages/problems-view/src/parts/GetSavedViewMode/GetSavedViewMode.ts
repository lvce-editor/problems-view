import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const getSavedViewMode = (savedState: any): number => {
  if (savedState && typeof savedState.viewMode === 'number') {
    return savedState.viewMode
  }
  return ProblemsViewMode.List
}
