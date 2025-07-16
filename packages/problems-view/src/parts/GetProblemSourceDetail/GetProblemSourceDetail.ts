// TODO compute detail message in getVisibleProblems
export const getProblemSourceDetail = (source: string, code: string | number): string => {
  let message = ''
  if (source) {
    message += `${source}`
  }
  if (code) {
    message += `(${code})`
  }
  message += ' '
  return message
}
