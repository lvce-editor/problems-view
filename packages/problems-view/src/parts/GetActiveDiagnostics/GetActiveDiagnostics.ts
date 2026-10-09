import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'
import { getDiagnostics } from '../GetDiagnostics/GetDiagnostics.ts'

export const getActiveDiagnostics = async (editorId: number): Promise<readonly Diagnostic[]> => {
  try {
    return await getDiagnostics(editorId)
  } catch {
    return []
  }
}
