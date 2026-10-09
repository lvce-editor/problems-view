import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'

export const getDiagnosticKey = (diagnostic: Diagnostic): string =>
  JSON.stringify([
    diagnostic.uri,
    diagnostic.rowIndex,
    diagnostic.columnIndex,
    diagnostic.message,
    diagnostic.source,
    diagnostic.type,
    diagnostic.code,
  ])
