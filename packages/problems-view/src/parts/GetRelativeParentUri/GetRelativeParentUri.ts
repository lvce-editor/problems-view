const leadingSlashesRegex = /^\/+/
const trailingSlashRegex = /\/$/
const schemeRootRegex = /^[a-z][a-z\d+.-]*:\/\/$/i
const windowsDrivePathRegex = /^\/[a-z]:\//i

const normalizeFileUri = (uri: string): string => {
  const normalizedUri = uri.startsWith('file://') ? uri.slice('file://'.length) : uri
  return windowsDrivePathRegex.test(normalizedUri) ? normalizedUri.slice(1) : normalizedUri
}

export const getRelativeParentUri = (uri: string, workspaceUri: string): string => {
  const normalizedUri = normalizeFileUri(uri)
  const normalizedWorkspaceUri = normalizeFileUri(workspaceUri).replace(trailingSlashRegex, '')
  const slashIndex = normalizedUri.lastIndexOf('/')
  if (slashIndex === -1) {
    return ''
  }
  const parentUri = normalizedUri.slice(0, slashIndex)
  if (schemeRootRegex.test(parentUri)) {
    return ''
  }
  if (parentUri === normalizedWorkspaceUri) {
    return ''
  }
  if (normalizedWorkspaceUri && parentUri.startsWith(`${normalizedWorkspaceUri}/`)) {
    return parentUri.slice(normalizedWorkspaceUri.length + 1)
  }
  return parentUri.replace(leadingSlashesRegex, '')
}
