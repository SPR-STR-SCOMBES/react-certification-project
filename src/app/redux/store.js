import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { quizReducer } from '@/features/quiz/redux/quizSlice'

const rootReducer = combineReducers({
    quiz: quizReducer
})

export const store = configureStore({
    reducer: rootReducer,
})