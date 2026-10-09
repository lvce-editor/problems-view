import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'
import { getDiagnosticKey } from '../GetDiagnosticKey/GetDiagnosticKey.ts'

export const getUniqueDiagnostics = (diagnostics: readonly Diagnostic[]): readonly Diagnostic[] => {
  const keys = new Set<string>()
  return diagnostics.filter((diagnostic) => {
    const key = getDiagnosticKey(diagnostic)
    if (keys.has(key)) {
      return false
    }
    keys.add(key)
    return true
  })
}
