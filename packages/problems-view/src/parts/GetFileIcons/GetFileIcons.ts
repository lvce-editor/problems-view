import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { Problem } from '../Problem/Problem.ts'

interface FileIconRequest {
  readonly name: string
  readonly uri: string
}

const getMissingRequests = (problems: readonly Problem[], fileIconCache: FileIconCache): readonly FileIconRequest[] => {
  const missingRequests: FileIconRequest[] = []
  const pendingUris = new Set<string>()
  for (const problem of problems) {
    const { fileName, uri } = problem
    if (!uri || uri in fileIconCache || pendingUris.has(uri)) {
      continue
    }
    pendingUris.add(uri)
    missingRequests.push({ name: fileName, uri })
  }
  return missingRequests
}

const requestFileIcon = (name: string): Promise<string> => {
  if (!name) {
    return Promise.resolve('')
  }
  return RendererWorker.getFileIcon({ name })
}

export const getFileIcons = async (problems: readonly Problem[], fileIconCache: FileIconCache): Promise<FileIconCache> => {
  const missingRequests = getMissingRequests(problems, fileIconCache)
  if (missingRequests.length === 0) {
    return fileIconCache
  }
  const icons = await Promise.all(missingRequests.map((request) => requestFileIcon(request.name)))
  const newFileIconCache = { ...fileIconCache }
  for (let i = 0; i < missingRequests.length; i++) {
    newFileIconCache[missingRequests[i].uri] = icons[i]
  }
  return newFileIconCache
}
