import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import { collapseAll } from '../CollapseAll/CollapseAll.ts'
import * as CopyMessage from '../CopyMessage/CopyMessage.ts'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as FocusIndex from '../FocusIndex/FocusIndex.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import { getMenuEntries2 } from '../GetMenuEntries2/GetMenuEntries2.ts'
import { getMenuIds } from '../GetMenuIds/GetMenuIds.ts'
import { handleActiveEditorChange, handleDiagnosticsChange } from '../HandleActiveEditorChange/HandleActiveEditorChange.ts'
import * as HandleArrowLeft from '../HandleArrowLeft/HandleArrowLeft.ts'
import * as HandleArrowRight from '../HandleArrowRight/HandleArrowRight.ts'
import * as HandleBlur from '../HandleBlur/HandleBlur.ts'
import { handleClickButton } from '../HandleClickButton/HandleClickButton.ts'
import { handleClickMoreFilters } from '../HandleClickMoreFilters/HandleClickMoreFilters.ts'
import { handleContextMenu } from '../HandleContextMenu/HandleContextMenu.ts'
import * as HandleFilterInput from '../HandleFilterInput/HandleFilterInput.ts'
import { handleIconThemeChange } from '../HandleIconThemeChange/HandleIconThemeChange.ts'
import { handleProblemClick } from '../HandleProblemClick/HandleProblemClick.ts'
import { handleScrollBarCaptureLost } from '../HandleScrollBarCaptureLost/HandleScrollBarCaptureLost.ts'
import { handleScrollBarClick } from '../HandleScrollBarClick/HandleScrollBarClick.ts'
import { handleScrollBarMove } from '../HandleScrollBarMove/HandleScrollBarMove.ts'
import { handleWheel } from '../HandleWheel/HandleWheel.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as WrapCommand from '../ProblemsStates/ProblemsStates.ts'
import { getCommandIds } from '../ProblemsStates/ProblemsStates.ts'
import * as Render2 from '../Render2/Render2.ts'
import { renderActions } from '../RenderActions/RenderActions.ts'
import { renderEventListeners } from '../RenderEventListeners/RenderEventListeners.ts'
import * as Resize from '../Resize/Resize.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import { toggleFileGroup } from '../ToggleFileGroup/ToggleFileGroup.ts'
import { viewAsList } from '../ViewAsList/ViewAsList.ts'
import { viewAsTable } from '../ViewAsTable/ViewAsTable.ts'

export const commandMap = {
  'Problems.collapseAll': WrapCommand.wrapCommand(collapseAll),
  'Problems.copyMessage': WrapCommand.wrapCommand(CopyMessage.copyMessage),
  'Problems.create': Create.create,
  'Problems.diff2': Diff2.diff2,
  'Problems.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'Problems.getCommandIds': getCommandIds,
  'Problems.getKeyBindings': GetKeyBindings.getKeyBindings,
  'Problems.getMenuEntries2': WrapCommand.wrapGetter(getMenuEntries2),
  'Problems.getMenuIds': getMenuIds,
  'Problems.handleActiveEditorChange': WrapCommand.wrapCommand(handleActiveEditorChange),
  'Problems.handleArrowLeft': WrapCommand.wrapCommand(HandleArrowLeft.handleArrowLeft),
  'Problems.handleArrowRight': WrapCommand.wrapCommand(HandleArrowRight.handleArrowRight),
  'Problems.handleBlur': WrapCommand.wrapCommand(HandleBlur.handleBlur),
  'Problems.handleClickAt': WrapCommand.wrapCommand(handleProblemClick),
  'Problems.handleClickButton': WrapCommand.wrapCommand(handleClickButton),
  'Problems.handleClickMoreFilters': WrapCommand.wrapCommand(handleClickMoreFilters),
  'Problems.handleContextMenu': WrapCommand.wrapCommand(handleContextMenu),
  'Problems.handleDiagnosticsChange': WrapCommand.wrapCommand(handleDiagnosticsChange),
  'Problems.handleFilterInput': WrapCommand.wrapCommand(HandleFilterInput.handleFilterInput),
  'Problems.handleIconThemeChange': WrapCommand.wrapCommand(handleIconThemeChange),
  'Problems.handleScrollBarCaptureLost': WrapCommand.wrapCommand(handleScrollBarCaptureLost),
  'Problems.handleScrollBarClick': WrapCommand.wrapCommand(handleScrollBarClick),
  'Problems.handleScrollBarMove': WrapCommand.wrapCommand(handleScrollBarMove),
  'Problems.handleWheel': WrapCommand.wrapCommand(handleWheel),
  'Problems.initialize': Initialize.initialize,
  'Problems.loadContent': WrapCommand.wrapCommand(loadContent),
  'Problems.render2': Render2.render2,
  'Problems.renderActions': renderActions,
  'Problems.renderEventListeners': renderEventListeners,
  'Problems.resize': Resize.resize,
  'Problems.saveState': WrapCommand.wrapGetter(SaveState.saveState),
  'Problems.terminate': ViewletRegistry.terminate,
  'Problems.toggleFileGroup': WrapCommand.wrapCommand(toggleFileGroup),
  'Problems.viewAsList': WrapCommand.wrapCommand(viewAsList),
  'Problems.viewAsTable': WrapCommand.wrapCommand(viewAsTable),
}
