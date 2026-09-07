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

const testWorkerPath = join(nodeModulesPath, '@lvce-editor', 'test-worker', 'dist', 'testWorkerMain.js')

const serverStaticPath = join(nodeModulesPath, '@lvce-editor', 'static-server', 'static')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

const testWorkerStaticPath = join(serverStaticPath, commitHash, 'packages', 'test-worker', 'dist', 'testWorkerMain.js')
const rendererProcessPath = join(nodeModulesPath, '@lvce-editor', 'renderer-process', 'dist', 'rendererProcessMain.js')
const rendererProcessStaticPath = join(serverStaticPath, commitHash, 'packages', 'renderer-process', 'dist', 'rendererProcessMain.js')

const content = await readFile(rendererWorkerMainPath, 'utf-8')
// Older renderer bundles still invoke the removed Problems initializer.
let newContent = content.replace(/^  await invoke[\w$]*\(ipc, 'Problems\.initialize'\);\r?\n/gm, '')

const remoteUrl = getRemoteUrl(workerPath)
if (!content.includes('// const problemsViewWorkerUrl = ')) {
  const occurrence = `const problemsViewWorkerUrl = \`\${assetDir}/packages/problems-view/dist/problemsViewWorkerMain.js\``
  const replacement = `// const problemsViewWorkerUrl = \`\${assetDir}/packages/problems-view/dist/problemsViewWorkerMain.js\`
const problemsViewWorkerUrl = \`${remoteUrl}\``

  newContent = newContent.replace(occurrence, replacement)
}
if (newContent !== content) {
  await writeFile(rendererWorkerMainPath, newContent)
}

await copyFile(testWorkerPath, testWorkerStaticPath)

await copyFile(rendererProcessPath, rendererProcessStaticPath)
