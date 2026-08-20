import { activate as activateExtensionApi, registerDiagnosticProvider } from '@lvce-editor/api'

const diagnosticProvider = {
  id: 'xyz-diagnostics',
  languageId: 'xyz',
  provideDiagnostics(textDocument) {
    const targetUri = textDocument.uri.replace('main.xyz', 'types.xyz')
    return [
      {
        uri: textDocument.uri,
        rowIndex: 0,
        columnIndex: 0,
        endRowIndex: 0,
        endColumnIndex: 5,
        message: 'Type mismatch',
        relatedInformation: [
          {
            uri: targetUri,
            rowIndex: 1,
            columnIndex: 0,
            endRowIndex: 1,
            endColumnIndex: 6,
            message: 'The expected type is declared here',
          },
        ],
        source: 'xyz',
        type: 'error',
      },
    ]
  },
}

await activateExtensionApi()
registerDiagnosticProvider(diagnosticProvider)
