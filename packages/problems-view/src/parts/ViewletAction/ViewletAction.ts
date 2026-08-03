export interface ViewletAction {
  readonly badgeText?: string
  readonly command: string | number
  readonly icon?: string
  readonly id: string | number
  readonly name?: string
  readonly placeholder?: string
  readonly type: number
  readonly value?: string
}
