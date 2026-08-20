export interface Diagnostic {
  readonly code: string | number
  readonly columnIndex: number
  readonly listItemType: number
  readonly message: string
  readonly relatedInformation?: readonly RelatedDiagnosticInformation[]
  readonly relativePath: string
  readonly rowIndex: number
  readonly source: string
  readonly type: string
  readonly uri: string
}

export interface RelatedDiagnosticInformation {
  readonly columnIndex: number
  readonly endColumnIndex: number
  readonly endRowIndex: number
  readonly message: string
  readonly rowIndex: number
  readonly uri: string
}
