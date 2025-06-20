import { Answer } from './Answer'

export interface Question {
  guid: string
  number: number
  text: string
  points: number
  imageUrl?: string
  moduleGuid: string
  topicGuid: string
  answers: Answer[]
}
