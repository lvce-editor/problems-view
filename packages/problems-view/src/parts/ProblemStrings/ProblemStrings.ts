import * as I18NString from '@lvce-editor/i18n'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const noProblemsDetected = (): string => {
  return I18NString.i18nString(UiStrings.NoProblemsDetected)
}

export const getMessage = (problemsCount: number): string => {
  if (problemsCount === 0) {
    return I18NString.i18nString(UiStrings.NoProblemsDetected)
  }
  return I18NString.i18nString(UiStrings.ProblemsDetected)
}

export const atLineColumn = (line: number, column: number): string => {
  return I18NString.i18nString(UiStrings.LineColumn, {
    PH1: line,
    PH2: column,
  })
}

export const copy = (): string => {
  return I18NString.i18nString(UiStrings.Copy)
}

export const clearFilter = (): string => {
  return I18NString.i18nString(UiStrings.ClearFilters)
}

export const code = (): string => {
  return I18NString.i18nString(UiStrings.Code)
}

export const message = (): string => {
  return I18NString.i18nString(UiStrings.Message)
}

export const file = (): string => {
  return I18NString.i18nString(UiStrings.File)
}

export const filter = (): string => {
  return I18NString.i18nString(UiStrings.Filter)
}

export const showingOf = (visibleCount: number, totalCount: number): string => {
  return I18NString.i18nString(UiStrings.ShowingOfItems, {
    PH1: visibleCount,
    PH2: totalCount,
  })
}

export const source = (): string => {
  return I18NString.i18nString(UiStrings.Source)
}

export const copyMessage = (): string => {
  return I18NString.i18nString(UiStrings.CopyMessage)
}

export const noResultsFoundWithProvidedFilterCriteria = (): string => {
  return I18NString.i18nString(UiStrings.NoResultsFoundWithProvidedFilterCriteria)
}

export const collapseAll = (): string => {
  return I18NString.i18nString(UiStrings.CollapseAll)
}

export const viewAsList = (): string => {
  return I18NString.i18nString(UiStrings.ViewAsList)
}

export const viewAsTable = (): string => {
  return I18NString.i18nString(UiStrings.ViewAsTable)
}
