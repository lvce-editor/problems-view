import * as HasProperty from '../HasProperty/HasProperty.ts'
import * as IsString from '../IsString/IsString.ts'

export const getSavedCollapsedUris = (savedState: unknown): readonly string[] => {
  if (!HasProperty.hasProperty(savedState, 'collapsedUris')) {
    return []
  }
  const { collapsedUris } = savedState
  if (Array.isArray(collapsedUris) && collapsedUris.every(IsString.isString)) {
    return [...new Set(collapsedUris)]
  }
  return []
}
