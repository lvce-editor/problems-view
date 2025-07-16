import { terminate } from '@lvce-editor/viewlet-registry'
import { copyMessage } from '../CopyMessage/CopyMessage.ts'
import * as Create from '../Create/Create.ts'
import { diff2 } from '../Diff2/Diff2.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as HandleArrowLeft from '../HandleArrowLeft/HandleArrowLeft.ts'
import * as HandleArrowRight from '../HandleArrowRight/HandleArrowRight.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as WrapCommand from '../ProblemsStates/ProblemsStates.ts'
import { render2 } from '../Render2/Render2.ts'
import { resize } from '../Resize/Resize.ts'
import { saveState } from '../SaveState/SaveState.ts'

export const commandMap = {
  'Problems.create': Create.create,
  'Problems.diff2': diff2,
  'Problems.getKeyBindings': GetKeyBindings.getKeyBindings,
  'Problems.handleArrowLeft': WrapCommand.wrapCommand(HandleArrowLeft.handleArrowLeft),
  'Problems.handleArrowRight': WrapCommand.wrapCommand(HandleArrowRight.handleArrowRight),
  'Problems.initialize': Initialize.initialize,
  'Problems.render2': render2,
  'Problems.saveState': saveState,
  'Problems.terminate': terminate,
  'Problems.copyMessage': copyMessage,
  'Problems.focusIndex': focusIndex,
  'Problems.resize': resize,
}
