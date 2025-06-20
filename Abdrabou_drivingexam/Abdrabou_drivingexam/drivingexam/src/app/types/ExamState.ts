import { Question } from './Question'
import { CheckAnswerResult } from './CheckAnswerResult'

export interface ExamState {
  questions: Question[]
  currentIndex: number
  selected: { [id: string]: boolean }
  result: CheckAnswerResult | null
  totalPoints: number
  totalReachable: number
}
