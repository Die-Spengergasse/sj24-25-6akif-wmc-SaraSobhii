import { Question } from './Question'
import { CheckAnswerResult } from './CheckAnswerResult'

export type TopicState = {
  questions: Question[]
  currentIndex: number
  selected: { [answerId: string]: boolean }
  result: CheckAnswerResult | null
}
