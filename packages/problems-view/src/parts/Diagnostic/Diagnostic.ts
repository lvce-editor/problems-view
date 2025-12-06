export interface Diagnostic {
  readonly code: string | number
  readonly columnIndex: number
  readonly listItemType: number
  readonly message: string
  readonly relativePath: string
  readonly rowIndex: number
  readonly source: string
  readonly type: string
  readonly uri: string
}
