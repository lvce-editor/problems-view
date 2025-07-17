import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import { renderFilterValue } from '../RenderFilterValue/RenderFilterValue.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'

export const getRenderer = (diffType: number): Renderer<ProblemsState> => {
  switch (diffType) {
    case DiffType.RenderItems:
      return RenderItems.renderItems
    case DiffType.RenderFilterValue:
      return renderFilterValue
    default:
      throw new Error('unknown renderer')
  }
}
