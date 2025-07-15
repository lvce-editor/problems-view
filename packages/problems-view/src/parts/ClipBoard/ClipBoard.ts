import { writeClipBoardText } from '../RendererWorker/RendererWorker.ts'

export const writeText = async (text: string): Promise<void> => {
  await writeClipBoardText(text)
}
