import { terminate } from '@lvce-editor/viewlet-registry'
import * as Create from '../Create/Create.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as HandleArrowLeft from '../HandleArrowLeft/HandleArrowLeft.ts'
import * as HandleArrowRight from '../HandleArrowRight/HandleArrowRight.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as WrapCommand from '../ProblemsStates/ProblemsStates.ts'
import { saveState } from '../SaveState/SaveState.ts'

export const commandMap = {
  'Problems.handleArrowLeft': WrapCommand.wrapCommand(HandleArrowLeft.handleArrowLeft),
  'Problems.handleArrowRight': WrapCommand.wrapCommand(HandleArrowRight.handleArrowRight),
  'Problems.create': Create.create,
  'Problems.getKeyBindings': GetKeyBindings.getKeyBindings,
  'Problems.terminate': terminate,
  'Problems.initialize': Initialize.initialize,
  'Problems.saveState': saveState,
}
