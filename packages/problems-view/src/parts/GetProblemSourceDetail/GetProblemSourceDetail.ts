// TODO compute detail message in getVisibleProblems
const syntaxCodeSuffix = ' (syntax)'

export const getProblemSourceDetail = (source: string, code: string | number): string => {
  let message = ''
  if (source) {
    const normalizedSource = code === 'syntax' && source.endsWith(syntaxCodeSuffix) ? source.slice(0, -syntaxCodeSuffix.length) : source
    message += normalizedSource
  }
  if (code) {
    message += `(${code})`
  }
  message += ' '
  return message
}
