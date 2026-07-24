import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as DiffCss from '../DiffCss/DiffCss.ts'
import * as DiffFilterValue from '../DiffFilterValue/DiffFilterValue.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffType from '../DiffType/DiffType.ts'

interface DiffFunction<T> {
  (oldState: T, newState: T): boolean
}

export const modules: readonly DiffFunction<ProblemsState>[] = [DiffItems.isEqual, DiffFilterValue.isEqual, DiffCss.isEqual]

export const numbers: readonly number[] = [DiffType.RenderItems, DiffType.RenderFilterValue, DiffType.RenderCss]
