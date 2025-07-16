export interface Problem {
  readonly message: string
  readonly uri: string
  readonly listItemType: number
  readonly source: string
  readonly rowIndex: number
  readonly columnIndex: number
  readonly relativePath: string
  readonly code: string | number
  readonly type: string
  readonly posInSet: number
  readonly setSize: number
  readonly level: number
  readonly count: number
}
