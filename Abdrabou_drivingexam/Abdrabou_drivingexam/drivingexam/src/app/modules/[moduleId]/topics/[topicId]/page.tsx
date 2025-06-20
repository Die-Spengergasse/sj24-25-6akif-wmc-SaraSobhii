'use client'

import { useEffect, useReducer } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import styles from './QuestionsPage.module.css'

import { getQuestions, checkAnswers } from '@/app/Driving_ApiClient/examApiClient'
import { CheckAnswerPayload } from '@/app/types/CheckAnswerPayload'
import { TopicAction } from '@/app/types/TopicAction'
import { TopicState } from '@/app/types/TopicState'
import { CheckAnswerResult } from '@/app/types/CheckAnswerResult'

const initialState: TopicState = {
  questions: [],
  currentIndex: 0,
  selected: {},
  result: null,
}

function topicReducer(state: TopicState, action: TopicAction): TopicState {
  switch (action.type) {
    case 'load':
      return {
        ...initialState,
        questions: action.payload,
      }
    case 'toggle':
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.answerId]: !state.selected[action.answerId],
        },
      }
    case 'check':
      return {
        ...state,
        result: action.payload,
      }
    case 'next':
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        selected: {},
        result: null,
      }
    default:
      return state
  }
}

export default function TopicQuestionsPage() {
  const { moduleId, topicId } = useParams()
  const [state, dispatch] = useReducer(topicReducer, initialState)

  const current = state.questions[state.currentIndex]

  useEffect(() => {
    if (!moduleId || !topicId) return

    getQuestions(moduleId as string, topicId as string)
      .then((data) => dispatch({ type: 'load', payload: data }))
      .catch((err) => console.error('Error loading the questions:', err))
  }, [moduleId, topicId])

  const handleCheck = (answerId: string) => {
    dispatch({ type: 'toggle', answerId })
  }

  const handleSubmit = async () => {
    if (!current) return

    const payload: CheckAnswerPayload = {
      checkedAnswers: current.answers.map((a) => ({
        guid: a.guid,
        isChecked: !!state.selected[a.guid],
      })),
    }

    const data: CheckAnswerResult = await checkAnswers(current.guid, payload)
    dispatch({ type: 'check', payload: data })
  }

  const handleNext = () => {
    dispatch({ type: 'next' })
  }

  if (!current) {
    return <p>You have answered every question.</p>
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Question {state.currentIndex + 1}</h2>
      <div className={styles.card}>
        <p className={styles.question}>{current.number}. {current.text}</p>

        {current.imageUrl && (
          <Image
            src={current.imageUrl}
            alt="Fragenbild"
            width={300}
            height={200}
            className={styles.image}
          />
        )}

        <form className={styles.answers} onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
          {current.answers.map((a) => {
            const isChecked = !!state.selected[a.guid]
            const isCorrect = state.result?.checkResult[a.guid]
            const highlight = state.result
              ? isCorrect
                ? styles.correct
                : styles.wrong
              : ''
            return (
              <div key={a.guid} className={`${styles.answerRow} ${highlight}`}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheck(a.guid)}
                  disabled={!!state.result}
                />
                <label>{a.text}</label>
              </div>
            )
          })}
        </form>

        {!state.result && (
          <button onClick={handleSubmit} className={styles.checkBtn}>
            Check Answer
          </button>
        )}

        {state.result && (
          <button onClick={handleNext} className={styles.nextBtn}>
            Next
          </button>
        )}
      </div>
    </div>
  )
}
