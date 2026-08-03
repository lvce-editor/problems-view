import * as InputName from '../InputName/InputName.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const getFilterInputName = (inputSource: number, filterValue: string): string => {
  if (inputSource === InputSource.Script && filterValue) {
    return `${InputName.Filter}-${encodeURIComponent(filterValue)}`
  }
  return InputName.Filter
}
