export interface OpenUriOptions {
  readonly initialCursorPosition?: {
    readonly columnIndex: number
    readonly highlightProblem?: boolean
    readonly rowIndex: number
  }
  readonly shouldFocus?: boolean
  readonly uri: string
}
