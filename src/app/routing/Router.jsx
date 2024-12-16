import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '@/app/routing/ProtectedRoute'

import { ROUTES } from '@/configs/routes'

import QuizPage from '@/features/quiz/pages/QuizPage'
import QuizResultPage from '@/features/quiz/pages/QuizResultPage'
import { resultAvailableGuard } from '@/app/routing/guards/resultAvailable'
import { useQuiz } from '@/hooks/useQuiz'

export default function Router()  {
    const { questions, isResultAvailable } = useQuiz()
    return (
        <BrowserRouter>
            <Routes>
                <Route index path={ ROUTES?.FRONT?.QUIZ_MAKER } element={ <QuizPage/> }/>
                <Route path={ ROUTES?.FRONT?.QUIZ_RESULT } element={
                    <ProtectedRoute guard={ resultAvailableGuard(isResultAvailable) } fallback={ ROUTES?.FRONT?.QUIZ_MAKER }>
                        <QuizResultPage/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </BrowserRouter>
    )
}