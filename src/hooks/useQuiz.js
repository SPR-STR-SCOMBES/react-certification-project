import { useContext } from 'react'
import QuizContext from '@/features/quiz/context/QuizContext'

export function useQuiz() {
    return useContext(QuizContext)
}