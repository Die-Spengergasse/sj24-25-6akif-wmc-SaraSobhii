import { CheckAnswerResult } from './CheckAnswerResult'
import { Question } from './Question'

export type TopicAction =
  | { type: 'load'; payload: Question[] }
  | { type: 'toggle'; answerId: string }
  | { type: 'check'; payload: CheckAnswerResult }
  | { type: 'next' }
