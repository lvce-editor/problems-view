export interface Problem {
  readonly code: string | number
  readonly columnIndex: number
  readonly count: number
  readonly fileName: string
  readonly level: number
  readonly listItemType: number
  readonly message: string
  readonly posInSet: number
  readonly relativePath: string
  readonly rowIndex: number
  readonly setSize: number
  readonly source: string
  readonly type: string
  readonly uri: string
}
