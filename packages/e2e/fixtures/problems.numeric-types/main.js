import { activate as activateExtensionApi, registerDiagnosticProvider } from '@lvce-editor/api'

const diagnosticProvider = {
  id: 'xyz-diagnostics',
  languageId: 'xyz',
  provideDiagnostics(textDocument) {
    return ['error', 'warning', 'spelling', 'info'].map((type) => ({
      uri: textDocument.uri,
      rowIndex: 0,
      columnIndex: 0,
      endRowIndex: 0,
      endColumnIndex: 1,
      message: `${type} 1`,
      source: 'xyz',
      type,
    }))
  },
}

await activateExtensionApi()
registerDiagnosticProvider(diagnosticProvider)
