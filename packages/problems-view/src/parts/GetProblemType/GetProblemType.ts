import * as DiagnosticType from '../DiagnosticType/DiagnosticType.ts'
import * as ProblemType from '../ProblemType/ProblemType.ts'

export const getProblemType = (type: string): number => {
  switch (type) {
    case DiagnosticType.Error:
      return ProblemType.Error
    case DiagnosticType.Warning:
      return ProblemType.Warning
    case 'info':
      return ProblemType.Info
    case 'spelling':
      return ProblemType.Spelling
    default:
      return type ? ProblemType.Other : ProblemType.Error
  }
}
