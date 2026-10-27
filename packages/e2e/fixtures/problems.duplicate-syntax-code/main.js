import { activate as activateExtensionApi, registerDiagnosticProvider } from '@lvce-editor/api'

const diagnosticProvider = {
  id: 'json-syntax-diagnostics',
  languageId: 'xyz',
  provideDiagnostics(textDocument) {
    return [
      {
        uri: textDocument.uri,
        rowIndex: 0,
        columnIndex: 2,
        endRowIndex: 0,
        endColumnIndex: 2,
        message: 'Expected a quoted property name.',
        source: 'json (syntax)',
        code: 'syntax',
        type: 'error',
      },
    ]
  },
}

await activateExtensionApi()
registerDiagnosticProvider(diagnosticProvider)
