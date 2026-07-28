const diagnosticProvider = {
  languageId: 'xyz',
  provideDiagnostics(textDocument) {
    return Array.from({ length: 100 }, (_, index) => ({
      columnIndex: 0,
      message: `problem ${index}`,
      rowIndex: index,
      source: 'xyz',
      uri: textDocument.uri,
    }))
  },
}

export const activate = () => {
  vscode.registerDiagnosticProvider(diagnosticProvider)
}
