import { activate as activateExtensionApi, registerDiagnosticProvider } from '@lvce-editor/api'

const createDiagnosticProvider = (languageId) => ({
  id: `test-${languageId}-diagnostics`,
  languageId,
  provideDiagnostics(textDocument) {
    return [
      {
        uri: textDocument.uri,
        rowIndex: 0,
        columnIndex: 0,
        endRowIndex: 0,
        endColumnIndex: 0,
        message: `problem for ${textDocument.uri.split('/').at(-1)}`,
        source: 'test',
        type: 'error',
      },
    ]
  },
})

await activateExtensionApi()
registerDiagnosticProvider(createDiagnosticProvider('json'))
registerDiagnosticProvider(createDiagnosticProvider('javascript'))
