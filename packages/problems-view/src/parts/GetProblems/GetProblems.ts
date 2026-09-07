import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'
import type { ProblemsResult } from '../ProblemsResult/ProblemsResult.ts'
import { toProblems } from '../ToProblems/ToProblems.ts'

const getDiagnosticKey = (diagnostic: Diagnostic): string =>
  JSON.stringify([
    diagnostic.uri,
    diagnostic.rowIndex,
    diagnostic.columnIndex,
    diagnostic.message,
    diagnostic.source,
    diagnostic.type,
    diagnostic.code,
  ])

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

export const getProblems = async (activeUri: string): Promise<ProblemsResult> => {
  if (!activeUri) {
    return {
      error: '',
      problems: [],
    }
  }
  try {
    const diagnostics = getUniqueDiagnostics(await EditorWorker.getProblems())
    const problems = toProblems(diagnostics)
    return {
      error: '',
      problems,
    }
  } catch (error) {
    return {
      error: String(error),
      problems: [],
    }
  }
}
