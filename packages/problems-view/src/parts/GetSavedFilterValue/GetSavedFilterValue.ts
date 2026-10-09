import * as HasProperty from '../HasProperty/HasProperty.ts'
import * as IsString from '../IsString/IsString.ts'

export const getSavedFilterValue = (savedState: unknown): string => {
  if (HasProperty.hasProperty(savedState, 'filterValue') && IsString.isString(savedState.filterValue)) {
    return savedState.filterValue
  }
  return ''
}
