export const matchesFilterValue = (string: string, filterValueLower: string): number => {
  if (filterValueLower) {
    return string.toLowerCase().indexOf(filterValueLower)
  }
  return 0
}
