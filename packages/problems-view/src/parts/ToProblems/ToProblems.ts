import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'
import type { Problem } from '../Problem/Problem.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

const toProblem = (diagnostic: Diagnostic, index: number): Problem => {
  const { message, rowIndex, columnIndex, source, code, type, uri } = diagnostic
  return {
    message: message || '',
    rowIndex: rowIndex || 0,
    columnIndex: columnIndex || 0,
    uri,
    relativePath: '',
    count: 0,
    source: source || '',
    code: code || '',
    type: type || 'error',
    listItemType: ProblemListItemType.Item,
    posInSet: index,
    setSize: 1,
    level: 2,
    fileName: '',
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
    message: '',
    rowIndex: 0,
    columnIndex: 0,
    uri: '',
    relativePath: '',
    count: 0,
    source: '',
    code: '',
    level: 0,
    listItemType: 0,
    posInSet: 0,
    setSize: 0,
    type: '',
    fileName: '',
  }
  let relativeIndex = 0
  for (const diagnostic of diagnostics) {
    if (diagnostic.uri === problem.uri) {
      relativeIndex++
      problem.count++
    } else {
      relativeIndex = 1
      problem = {
        message: '',
        rowIndex: 0,
        columnIndex: 0,
        uri: diagnostic.uri,
        relativePath: '',
        count: 1,
        source: '',
        type: '',
        listItemType: ProblemListItemType.Expanded,
        posInSet: relativeIndex,
        setSize: 123,
        level: 1,
        code: '',
        fileName: '',
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
