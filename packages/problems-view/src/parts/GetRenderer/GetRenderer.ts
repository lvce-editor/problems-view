import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import { renderCss } from '../RenderCss/RenderCss.ts'
import { renderFilterValue } from '../RenderFilterValue/RenderFilterValue.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'

export const getRenderer = (diffType: number): Renderer<ProblemsState> => {
  switch (diffType) {
    case DiffType.RenderCss:
      return renderCss
    case DiffType.RenderFilterValue:
      return renderFilterValue
    case DiffType.RenderItems:
      return RenderItems.renderItems
    default:
      throw new Error('unknown renderer')
  }
}
