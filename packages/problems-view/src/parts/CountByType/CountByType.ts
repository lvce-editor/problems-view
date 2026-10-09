import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'

export const countByType = (diagnostics: readonly Diagnostic[], type: string): number => {
  return diagnostics.filter((diagnostic) => diagnostic.type === type).length
}
