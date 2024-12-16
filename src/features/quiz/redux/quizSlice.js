import { createSlice } from '@reduxjs/toolkit'
import { buildCategories, buildDifficulties, buildQuestions } from '@/features/quiz/redux/quizThunks'
import { shuffle } from '@/utils/common'

const initialState = {
    categories: [],
    difficulties: [],
    selectedCategory: null,
    selectedDifficulty: null,
    questions: [],
    submitted: false,
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        resetState() {
          return initialState
        },
        setCategory(state, action) {
            return {
                ...state,
                selectedCategory: action?.payload
            }
        },
        setDifficulty(state, action) {
            return {
                ...state,
                selectedDifficulty: action?.payload
            }
        },
        setAnswers(state, action) {
            return {
                ...state,
                questions: state?.questions?.map((question) => (
                    question?.id === action?.payload?.id
                        ? {
                            ...question,
                            answers: action?.payload?.answers
                        }
                        : question
                ))
            }
        },
        submit(state) {
            return {
                ...state,
                submitted: true
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(buildCategories.fulfilled, (state, action) => {
                return {
                    ...state,
                    categories: action.payload
                }
            })
            .addCase(buildDifficulties.fulfilled, (state, action) => {
                return {
                    ...state,
                    difficulties: action.payload
                }
            })
            .addCase(buildQuestions.fulfilled, (state, action) => {
                return {
                    ...state,
                    questions: action?.payload?.map((question, i) => ({
                        ...question,
                        id: i,
                        answers: shuffle([ question.correct_answer, ...question.incorrect_answers ])?.map((answer, i) => ({
                            id: i,
                            value: answer,
                            selected: false,
                            correct: answer === question.correct_answer
                        }))
                    }))
                }
            })
    }
})

export const {
    resetState,
    setCategory,
    setDifficulty,
    setAnswers,
    submit,
} = quizSlice.actions

export const quizReducer = quizSlice.reducer