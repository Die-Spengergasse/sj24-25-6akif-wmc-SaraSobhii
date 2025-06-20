import { CheckAnswerResult } from './CheckAnswerResult'
import { Question } from './Question'

export type ExamAction =
  | { type: 'load'; payload: Question[] }
  | { type: 'check'; payload: CheckAnswerResult }
  | { type: 'next' }
  | { type: 'toggle'; answerId: string }
