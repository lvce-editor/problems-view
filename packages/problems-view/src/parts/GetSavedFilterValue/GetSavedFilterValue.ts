export const getSavedFilterValue = (savedState: any): string => {
  if (savedState && typeof savedState.filterValue === 'string') {
    return savedState.filterValue
  }
  return ''
}
