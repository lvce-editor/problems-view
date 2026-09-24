const latestRequestByUid = new Map<number, number>()

export const startProblemsRequest = (uid: number): number => {
  const request = (latestRequestByUid.get(uid) || 0) + 1
  latestRequestByUid.set(uid, request)
  return request
}

export const isLatestProblemsRequest = (uid: number, request: number): boolean => {
  return latestRequestByUid.get(uid) === request
}
