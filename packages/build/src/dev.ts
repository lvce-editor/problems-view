import { execa } from 'execa'
import { buildE2eExtensions } from './buildE2eExtensions.ts'
import { root } from './root.ts'

const main = async (): Promise<void> => {
  await buildE2eExtensions()
  void execa(`npm`, ['run', 'build:watch'], {
    cwd: root,
    stdio: 'inherit',
  })
  void execa('node', ['node_modules/@lvce-editor/server/bin/server.js', '--test-path=packages/e2e'], {
    cwd: root,
    stdio: 'inherit',
  })
}

void main()
