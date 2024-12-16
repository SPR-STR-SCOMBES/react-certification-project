import { Provider as ReduxProvider } from 'react-redux'
import QuizProvider from '@/features/quiz/context/QuizProvider'
import Router from '@/app/routing/Router'

import { store } from '@/app/redux/store'

export default function App() {
    return (<>
        <ReduxProvider store={ store }>
            <QuizProvider>
                <Router/>
            </QuizProvider>
        </ReduxProvider>
    </>)
}