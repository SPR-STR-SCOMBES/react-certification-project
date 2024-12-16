import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategories, fetchQuestions } from '@/api/quiz'
import { LABELS } from '@/configs/labels'

export const buildCategories = createAsyncThunk('quiz/buildCategories', async (_, { rejectWithValue }) => {
    return fetchCategories()
        .then((response) => {
            return response?.data?.trivia_categories
        })
        .catch((error) => {
            return rejectWithValue(error.response || error.message)
        })
})

export const buildDifficulties = createAsyncThunk('quiz/buildDifficulties', async () => {
    return new Promise((resolve) => {
        resolve(LABELS?.FORMS?.MAKER?.CONTROLS?.DIFFICULTY?.OPTIONS)
    })
})

export const buildQuestions = createAsyncThunk('quiz/buildQuestions', async ({ amount, category, difficulty, type }, { rejectWithValue }) => {
    return fetchQuestions(amount, category, difficulty, type)
        .then((response) => {
            return response?.data?.results
        })
        .catch((error) => {
            return rejectWithValue(error.response || error.message)
        })
})