import { execa } from 'execa'
import { root } from './root.ts'

const main = async (): Promise<void> => {
  void execa(`npm`, ['run', 'build:watch'], {
    cwd: root,
    stdio: 'inherit',
  })
  void execa('node', ['packages/server/node_modules/@lvce-editor/server/bin/server.js', '--test-path=packages/e2e'], {
    cwd: root,
    stdio: 'inherit',
  })
}

void main()
