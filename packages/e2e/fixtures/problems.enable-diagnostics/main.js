import { activate as activateExtensionApi, registerDiagnosticProvider } from '@lvce-editor/api'

const diagnosticProvider = {
  id: 'test-diagnostics',
  languageId: 'javascript',
  provideDiagnostics(textDocument) {
    return [
      {
        uri: textDocument.uri,
        rowIndex: 0,
        columnIndex: 0,
        endRowIndex: 0,
        endColumnIndex: 0,
        message: 'error 1',
        source: 'test',
        type: 'error',
      },
    ]
  },
}

await activateExtensionApi()
registerDiagnosticProvider(diagnosticProvider)
