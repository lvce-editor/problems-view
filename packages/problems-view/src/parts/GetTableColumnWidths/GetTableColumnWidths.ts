export const iconColumnWidth = 30

export const getTableColumnWidths = (width: number, columnWidths: readonly number[]): readonly number[] => {
  const availableWidth = Math.max(0, width - iconColumnWidth)
  return [iconColumnWidth, ...columnWidths.map((fraction) => fraction * availableWidth)]
}
