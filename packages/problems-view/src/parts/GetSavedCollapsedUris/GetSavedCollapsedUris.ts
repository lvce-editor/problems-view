import * as IsString from '../IsString/IsString.ts'

export const getSavedCollapsedUris = (savedState: any): readonly string[] => {
  const collapsedUris: unknown = savedState?.collapsedUris
  if (Array.isArray(collapsedUris) && collapsedUris.every(IsString.isString)) {
    return [...new Set(collapsedUris)]
  }
  return []
}
