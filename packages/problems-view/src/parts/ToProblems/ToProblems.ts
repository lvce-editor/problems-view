import type { Diagnostic, RelatedDiagnosticInformation } from '../Diagnostic/Diagnostic.ts'
import type { Problem } from '../Problem/Problem.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

const toProblem = (diagnostic: Diagnostic, index: number): DeepMutable<Problem> => {
  const { code, columnIndex, message, rowIndex, source, type, uri } = diagnostic
  return {
    code: code || '',
    columnIndex: columnIndex || 0,
    count: 0,
    fileName: '',
    level: 2,
    listItemType: ProblemListItemType.Item,
    message: message || '',
    posInSet: index,
    rowIndex: rowIndex || 0,
    setSize: 1,
    source: source || '',
    type: type || 'error',
    uri,
  }
}

const getFileName = (uri: string): string => {
  const slashIndex = uri.lastIndexOf('/')
  return uri.slice(slashIndex + 1)
}

const toRelatedProblem = (
  relatedInformation: RelatedDiagnosticInformation,
  diagnostic: Diagnostic,
  index: number,
  setSize: number,
): DeepMutable<Problem> => {
  return {
    code: '',
    columnIndex: relatedInformation.columnIndex || 0,
    count: 0,
    fileName: '',
    level: 3,
    listItemType: ProblemListItemType.Item,
    message: relatedInformation.message || '',
    posInSet: index,
    rowIndex: relatedInformation.rowIndex || 0,
    setSize,
    source: getFileName(relatedInformation.uri),
    targetUri: relatedInformation.uri,
    type: diagnostic.type || 'error',
    uri: diagnostic.uri,
  }
}

type DeepMutable<T> = { -readonly [P in keyof T]: DeepMutable<T[P]> }

export const toProblems = (diagnostics: readonly Diagnostic[]): readonly Problem[] => {
  const problems: DeepMutable<Problem>[] = []
  let problem: DeepMutable<Problem> = {
    code: '',
    columnIndex: 0,
    count: 0,
    fileName: '',
    level: 0,
    listItemType: 0,
    message: '',
    posInSet: 0,
    rowIndex: 0,
    setSize: 0,
    source: '',
    type: '',
    uri: '',
  }
  let relativeIndex = 0
  for (const diagnostic of diagnostics) {
    if (diagnostic.uri === problem.uri) {
      relativeIndex++
      problem.count++
    } else {
      relativeIndex = 1
      problem = {
        code: '',
        columnIndex: 0,
        count: 1,
        fileName: '',
        level: 1,
        listItemType: ProblemListItemType.Expanded,
        message: '',
        posInSet: relativeIndex,
        rowIndex: 0,
        setSize: 123,
        source: '',
        type: '',
        uri: diagnostic.uri,
      }
      problems.push(problem)
    }
    problems.push(toProblem(diagnostic, relativeIndex))
    const relatedInformation = diagnostic.relatedInformation || []
    for (let i = 0; i < relatedInformation.length; i++) {
      problems.push(toRelatedProblem(relatedInformation[i], diagnostic, i + 1, relatedInformation.length))
    }
  }
  for (const problem of problems) {
    const displayUri = problem.targetUri || problem.uri
    problem.fileName = getFileName(displayUri)
  }
  return problems
}
