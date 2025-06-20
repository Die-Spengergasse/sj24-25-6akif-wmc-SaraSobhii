export interface CheckAnswerPayload {
  checkedAnswers: {
    guid: string
    isChecked: boolean
  }[]
}
