export interface CheckAnswerResult {
  pointsReachable: number
  pointsReached: number
  checkResult: {
    [answerGuid: string]: boolean
  }
}
