export const getListIndex = (eventX: number, eventY: number, x: number, y: number, deltaY: number, itemHeight: number): number => {
  const relativeY = eventY - y + deltaY
  const index = Math.floor(relativeY / itemHeight)
  return index
}
