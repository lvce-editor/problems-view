export interface OpenUriOptions {
  readonly initialCursorPosition?: {
    readonly columnIndex: number
    readonly rowIndex: number
  }
  readonly shouldFocus?: boolean
  readonly uri: string
}
