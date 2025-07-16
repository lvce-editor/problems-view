import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import * as CopyMessage from '../CopyMessage/CopyMessage.ts'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as FocusIndex from '../FocusIndex/FocusIndex.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as HandleArrowLeft from '../HandleArrowLeft/HandleArrowLeft.ts'
import * as HandleArrowRight from '../HandleArrowRight/HandleArrowRight.ts'
import { handleClickAt } from '../HandleClickAt/HandleClickAt.ts'
import { handleContextMenu } from '../HandleContextMenu/HandleContextMenu.ts'
import { handleIconThemeChange } from '../HandleIconThemeChange/HandleIconThemeChange.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as WrapCommand from '../ProblemsStates/ProblemsStates.ts'
import * as Render2 from '../Render2/Render2.ts'
import { renderActions } from '../RenderActions/RenderActions.ts'
import { renderEventListeners } from '../RenderEventListeners/RenderEventListeners.ts'
import * as Resize from '../Resize/Resize.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as HandleFilterInput from '../HandleFilterInput/HandleFilterInput.ts'
import { viewAsList } from '../ViewAsList/ViewAsList.ts'
import { viewAsTable } from '../ViewAsTable/ViewAsTable.ts'

export const commandMap = {
  'Problems.copyMessage': CopyMessage.copyMessage,
  'Problems.create': Create.create,
  'Problems.diff2': Diff2.diff2,
  'Problems.focusIndex': FocusIndex.focusIndex,
  'Problems.getCommandIds': GetCommandIds.getCommandIds,
  'Problems.getKeyBindings': GetKeyBindings.getKeyBindings,
  'Problems.handleArrowLeft': WrapCommand.wrapCommand(HandleArrowLeft.handleArrowLeft),
  'Problems.handleArrowRight': WrapCommand.wrapCommand(HandleArrowRight.handleArrowRight),
  'Problems.handleClickAt': WrapCommand.wrapCommand(handleClickAt),
  'Problems.handleContextMenu': handleContextMenu,
  'Problems.handleFilterInput': WrapCommand.wrapCommand(HandleFilterInput.handleFilterInput),
  'Problems.handleIconThemeChange': handleIconThemeChange,
  'Problems.initialize': Initialize.initialize,
  'Problems.loadContent': WrapCommand.wrapCommand(loadContent),
  'Problems.render2': Render2.render2,
  'Problems.renderActions': renderActions,
  'Problems.renderEventListeners': renderEventListeners,
  'Problems.resize': Resize.resize,
  'Problems.saveState': SaveState.saveState,
  'Problems.terminate': ViewletRegistry.terminate,
  'Problems.viewAsList': viewAsList,
  'Problems.viewAsTable': viewAsTable,
}
