import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'
import type { Problem } from '../Problem/Problem.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

const toProblem = (diagnostic: Diagnostic, index: number): Problem => {
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
    relativePath: '',
    rowIndex: rowIndex || 0,
    setSize: 1,
    source: source || '',
    type: type || 'error',
    uri,
  }
}

const getRelativeParentUri = (uri: string, workspaceUri: string): string => {
  const slashIndex = uri.lastIndexOf('/')
  return uri.slice(0, slashIndex).slice(workspaceUri.length)
}

const getFileName = (uri: string): string => {
  const slashIndex = uri.lastIndexOf('/')
  return uri.slice(slashIndex + 1)
}

type DeepMutable<T> = { -readonly [P in keyof T]: DeepMutable<T[P]> }

export const toProblems = (diagnostics: readonly Diagnostic[], workspaceUri = ''): readonly Problem[] => {
  const problems = []
  let problem: DeepMutable<Problem> = {
    code: '',
    columnIndex: 0,
    count: 0,
    fileName: '',
    level: 0,
    listItemType: 0,
    message: '',
    posInSet: 0,
    relativePath: '',
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
        relativePath: '',
        rowIndex: 0,
        setSize: 123,
        source: '',
        type: '',
        uri: diagnostic.uri,
      }
      problems.push(problem)
    }
    problems.push(toProblem(diagnostic, relativeIndex))
  }
  for (const problem of problems) {
    // TODO maybe rename property, this should be the relative path of the parent folder of the file
    // @ts-ignore
    problem.relativePath = getRelativeParentUri(problem.uri, workspaceUri)
    // @ts-ignore
    problem.fileName = getFileName(problem.uri)
    // problem.uri = problem.uri // TODO
  }
  return problems
}
