import * as IconTheme from '../IconTheme/IconTheme.ts'

export const getIcon = (uri: string): string => {
  if (!uri) {
    return ''
  }
  return IconTheme.getFileNameIcon(uri)
}
