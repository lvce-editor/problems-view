const diagnosticProvider = {
  languageId: 'xyz',
  provideDiagnostics(textDocument, offset) {
    return [
      {
        uri: textDocument.uri,
        rowIndex: 0,
        columnIndex: 0,
        message: 'error 1',
        source: 'xyz',
        type: 'error',
      },
      {
        uri: textDocument.uri,
        rowIndex: 1,
        columnIndex: 0,
        message: 'warning 1',
        source: 'xyz',
        type: 'warning',
      },
      {
        uri: textDocument.uri,
        rowIndex: 2,
        columnIndex: 0,
        message: 'info 1',
        source: 'xyz',
        type: 'other',
      },
    ]
  },
}

export const activate = () => {
  vscode.registerDiagnosticProvider(diagnosticProvider)
}
