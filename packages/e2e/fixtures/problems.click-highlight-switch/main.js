import { activate as activateExtensionApi, registerDiagnosticProvider } from '@lvce-editor/api'

await activateExtensionApi()
registerDiagnosticProvider({
  id: 'xyz-diagnostics',
  languageId: 'xyz',
  provideDiagnostics(textDocument) {
    return [
      { uri: textDocument.uri, rowIndex: 1, columnIndex: 0, message: 'first error', source: 'xyz', type: 'error' },
      { uri: textDocument.uri, rowIndex: 2, columnIndex: 0, message: 'second warning', source: 'xyz', type: 'warning' },
    ]
  },
})
