import * as ViewletRegistry from '@lvce-editor//viewlet-registry'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const { get, set, wrapCommand, wrapGetter } = ViewletRegistry.create<ProblemsState>()
