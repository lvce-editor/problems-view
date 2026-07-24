export const getIndentRule = (indent: string): string => {
  return `.Indent-${indent} {
  padding-left: ${indent};
}`
}
