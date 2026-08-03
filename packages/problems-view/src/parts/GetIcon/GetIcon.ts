import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'

export const getIcon = (uri: string, fileIconCache: FileIconCache): string => {
  if (!uri) {
    return ''
  }
  return fileIconCache[uri] || ''
}
