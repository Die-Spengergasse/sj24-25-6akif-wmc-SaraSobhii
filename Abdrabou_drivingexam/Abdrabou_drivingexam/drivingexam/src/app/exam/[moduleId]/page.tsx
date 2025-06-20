'use client'

import { useEffect, useReducer, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { getModules, getExamQuestions, checkAnswers } from '@/app/Driving_ApiClient/examApiClient'
import { getFeedbackText } from '@/app/exam/examService'
import styles from './ExamPage.module.css'

import { ExamState } from '@/app/types/ExamState'
import { ExamAction } from '@/app/types/ExamAction'
import { CheckAnswerPayload } from '@/app/types/CheckAnswerPayload'
import { CheckAnswerResult } from '@/app/types/CheckAnswerResult'
import { Module } from '@/app/types/Module'

const initialState: ExamState = {
  questions: [],
  currentIndex: 0,
  selected: {},
  result: null,
  totalPoints: 0,
  totalReachable: 0,
}

function examReducer(state: ExamState, action: ExamAction): ExamState {
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
        totalPoints: state.totalPoints + action.payload.pointsReached,
        totalReachable: state.totalReachable + action.payload.pointsReachable,
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

export default function ExamPage() {
  const { moduleId } = useParams()
  const [state, dispatch] = useReducer(examReducer, initialState)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [moduleName, setModuleName] = useState('')

  const current = state.questions[state.currentIndex]

  useEffect(() => {
    if (!moduleId || typeof moduleId !== 'string') return

    getModules()
      .then((modules) => {
        const found = modules.find((m: Module) => m.guid === moduleId)
        if (found) setModuleName(found.name)
      })
      .catch((err) => console.error('Fehler beim Laden der Module:', err))

    getExamQuestions(moduleId)
      .then((data) => dispatch({ type: 'load', payload: data }))
      .catch((err) => {
        console.error('Fehler beim Laden der Fragen:', err)
        setError('Es ist ein Fehler beim Laden der Fragen aufgetreten. Bitte versuche es später erneut.')
      })
      .finally(() => setLoading(false))
  }, [moduleId])

  const handleCheck = (answerId: string) => {
    dispatch({ type: 'toggle', answerId })
  }

  if (Object.keys(state.selected).length === 0) {
  alert("Bitte wähle mindestens eine Antwort aus.")
  return
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

  if (loading) return <p className="text-center mt-10">Fragen werden geladen…</p>
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>

  if (!current) {
    return (
      <div className={styles.container}>
        <h2>Abgeschlossen!</h2>
        <p><strong>Modul:</strong> {moduleName || moduleId}</p>
        <p><strong>Dein Ergebnis:</strong> {state.totalPoints} / {state.totalReachable}</p>
        <p className="mt-2 text-xl">
          {getFeedbackText(state.totalPoints, state.totalReachable)}
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Frage {state.currentIndex + 1} von {state.questions.length}</h2>
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
            <div
              key={a.guid}
              className={`${styles.answerRow} ${highlight}`}
            >
              <input
                id={`answer-${a.guid}`}
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheck(a.guid)}
                disabled={!!state.result}
              />
              <label htmlFor={`answer-${a.guid}`}>{a.text}</label>
            </div>
          )
        })}
      </form>

      {/* Feedbacktext nach Überprüfung */}
      {state.result && (
        <p className="mt-2 text-lg">
          {state.result.pointsReached === state.result.pointsReachable
            ? "✅ Richtig beantwortet!"
            : "❌ Leider nicht ganz richtig."}
        </p>
      )}
      
      {!state.result && (
        <button onClick={handleSubmit} className={styles.checkBtn}>Antwort prüfen</button>
      )}

      {state.result && (
        <button onClick={handleNext} className={styles.nextBtn}>Nächste Frage</button>
      )}
    </div>
  )
}
