export interface ViewletAction {
  readonly badgeText?: string
  readonly command: string
  readonly icon?: string
  readonly id: string | number
  readonly placeholder?: string
  readonly type: number
  readonly value?: string
}
