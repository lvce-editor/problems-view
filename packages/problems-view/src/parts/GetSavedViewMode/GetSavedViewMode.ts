import * as HasProperty from '../HasProperty/HasProperty.ts'
import * as IsNumber from '../IsNumber/IsNumber.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const getSavedViewMode = (savedState: unknown): number => {
  if (HasProperty.hasProperty(savedState, 'viewMode') && IsNumber.isNumber(savedState.viewMode)) {
    return savedState.viewMode
  }
  return ProblemsViewMode.List
}
