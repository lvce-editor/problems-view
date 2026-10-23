import { cp, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/problems-view'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

export const getRemoteUrl = (path: string): string => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const content = await readFile(rendererWorkerPath, 'utf8')
const workerPath = join(root, '.tmp/dist/dist/problemsViewWorkerMain.js')
const problemsViewDistPath = join(root, 'dist', commitHash, 'packages', 'problems-view', 'dist', 'problemsViewWorkerMain.js')
const remoteUrl = getRemoteUrl(workerPath)

const occurrence = `\`${remoteUrl}\``
const replacement = '`${assetDir}/packages/problems-view/dist/problemsViewWorkerMain.js`'
if (!content.includes(occurrence)) {
  throw new Error('problems worker development URL not found in static renderer')
}
await writeFile(rendererWorkerPath, content.replace(occurrence, replacement))

const indexHtmlPath = join(root, 'dist', 'index.html')
const indexHtml = await readFile(indexHtmlPath, 'utf8')
const configRegex = /(<script id="Config" type="application\/json">)([\s\S]*?)(<\/script>)/
const configMatch = indexHtml.match(configRegex)
if (!configMatch) {
  throw new Error('static configuration not found')
}
const config = JSON.parse(configMatch[2])
if (config.workerUrls?.['develop.problemsWorkerPath'] !== remoteUrl) {
  throw new Error('problems worker development configuration not found')
}
config.workerUrls['develop.problemsWorkerPath'] = `/problems-view/${commitHash}/packages/problems-view/dist/problemsViewWorkerMain.js`
await writeFile(
  indexHtmlPath,
  indexHtml.replace(configRegex, (_, open, _content, close) => `${open}${JSON.stringify(config)}${close}`),
)

await cp(workerPath, problemsViewDistPath)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
