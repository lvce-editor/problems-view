import { copyFile, readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const __dirname = import.meta.dirname

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const nodeModulesPath = join(root, 'node_modules')

const workerPath = join(root, '.tmp', 'dist', 'dist', 'problemsViewWorkerMain.js')

const editorWorkerPath = join(nodeModulesPath, '@lvce-editor', 'editor-worker', 'dist', 'editorWorkerMain.js')

const mainAreaWorkerPath = join(nodeModulesPath, '@lvce-editor', 'main-area-worker', 'dist', 'mainAreaWorkerMain.js')

const testWorkerPath = join(nodeModulesPath, '@lvce-editor', 'test-worker', 'dist', 'testWorkerMain.js')

const serverStaticPath = join(nodeModulesPath, '@lvce-editor', 'static-server', 'static')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

const editorWorkerStaticPath = join(serverStaticPath, commitHash, 'packages', 'editor-worker', 'dist', 'editorWorkerMain.js')

const mainAreaWorkerStaticPath = join(serverStaticPath, commitHash, 'packages', 'main-area-worker', 'dist', 'mainAreaWorkerMain.js')

const testWorkerStaticPath = join(serverStaticPath, commitHash, 'packages', 'test-worker', 'dist', 'testWorkerMain.js')

const content = await readFile(rendererWorkerMainPath, 'utf-8')
// Older renderer bundles still invoke the removed Problems initializer.
let newContent = content.replace(/^  await invoke[\w$]*\(ipc, 'Problems\.initialize'\);\r?\n/gm, '')

const remoteUrl = getRemoteUrl(workerPath)
const occurrence = '`${assetDir}/packages/renderer-worker/node_modules/@lvce-editor/problems-view/dist/problemsViewWorkerMain.js`'
const replacement = `\`${remoteUrl}\``
if (!newContent.includes(replacement)) {
  if (!newContent.includes(occurrence)) {
    throw new Error('problems worker development URL not found')
  }
  newContent = newContent.replace(occurrence, replacement)
}

// Workspace resets can recreate the view with the new URI before notifying it.
// Use the reset command instead of the direct command's unchanged-URI shortcut.
const workspaceCommand = '        await invoke121(`Problems.${key}`, uid, ...args);'
const workspaceResetCommand = '        await invoke121(`Problems.${key === "handleWorkspaceChange" ? "resetWorkspace" : key}`, uid, ...args);'
if (!newContent.includes(workspaceResetCommand)) {
  if (!newContent.includes(workspaceCommand)) {
    throw new Error('problems workspace command adapter not found')
  }
  newContent = newContent.replace(workspaceCommand, workspaceResetCommand)
}

if (newContent !== content) {
  await writeFile(rendererWorkerMainPath, newContent)
}

await copyFile(editorWorkerPath, editorWorkerStaticPath)
await copyFile(mainAreaWorkerPath, mainAreaWorkerStaticPath)
await copyFile(testWorkerPath, testWorkerStaticPath)

const indexHtmlPath = join(serverStaticPath, 'index.html')
const indexHtml = await readFile(indexHtmlPath, 'utf8')
const configMatch = indexHtml.match(/<script id="Config" type="application\/json">([\s\S]*?)<\/script>/)
const existingConfig = configMatch ? JSON.parse(configMatch[1]) : {}
const config = {
  ...existingConfig,
  workerUrls: { ...existingConfig.workerUrls, 'develop.problemsWorkerPath': remoteUrl },
  rendererWorkerUrl: `/${commitHash}/packages/renderer-worker/dist/rendererWorkerMain.js`,
  editorWorkerUrl: `/${commitHash}/packages/editor-worker/dist/editorWorkerMain.js`,
  syntaxHighlightingWorkerUrl: `/${commitHash}/packages/syntax-highlighting-worker/dist/syntaxHighlightingWorkerMain.js`,
}
const configElement = `<script id="Config" type="application/json">${JSON.stringify(config)}</script>`
const configRegex = /<script id="Config" type="application\/json">[\s\S]*?<\/script>/g
const newIndexHtml = indexHtml.includes('id="Config"')
  ? indexHtml.replace(configRegex, configElement)
  : indexHtml.replace('</head>', `${configElement}\n</head>`)
await writeFile(indexHtmlPath, newIndexHtml)
