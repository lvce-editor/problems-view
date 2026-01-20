import type { MenuEntryId } from '@lvce-editor/constants'

export interface ContextMenuPropsBase {
  readonly menuId: number
}

export interface ContextMenuPropsProblemFilter extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.ProblemsFilter
}

export type ContextMenuProps = ContextMenuPropsProblemFilter
