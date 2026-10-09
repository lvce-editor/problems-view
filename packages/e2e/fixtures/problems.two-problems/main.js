import { activate as activateExtensionApi, registerDiagnosticProvider } from '@lvce-editor/api'

const diagnosticProvider = {
  id: 'xyz-diagnostics',
  languageId: 'xyz',
  provideDiagnostics(textDocument, offset) {
    return [
      {
        uri: textDocument.uri,
        rowIndex: 0,
        columnIndex: 0,
        endRowIndex: 0,
        endColumnIndex: 1,
        message: 'first diagnostic',
        source: 'xyz',
        type: 'error',
      },
      {
        uri: textDocument.uri,
        rowIndex: 0,
        columnIndex: 2,
        endRowIndex: 0,
        endColumnIndex: 3,
        message: 'second diagnostic',
        source: 'xyz',
        type: 'error',
      },
    ]
  },
}

await activateExtensionApi()
registerDiagnosticProvider(diagnosticProvider)
