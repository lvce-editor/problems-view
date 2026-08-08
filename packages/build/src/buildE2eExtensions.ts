import { build } from 'esbuild'
import { join } from 'node:path'
import { root } from './root.ts'

const buildE2eExtension = async (extensionName: string): Promise<void> => {
  const extensionPath = join(root, 'packages', 'e2e', 'fixtures', extensionName)
  await build({
    bundle: true,
    entryPoints: [join(extensionPath, 'main.js')],
    external: ['electron', 'node:*'],
    format: 'esm',
    outfile: join(extensionPath, 'dist', 'main.js'),
    platform: 'browser',
    target: 'esnext',
  })
}

export const buildE2eExtensions = async (): Promise<void> => {
  await buildE2eExtension('problems.click-focuses-editor')
  await buildE2eExtension('problems.one-problem')
}
