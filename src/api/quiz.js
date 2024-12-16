import { ROUTES } from '@/configs/routes'
import axios from 'axios'

export function fetchCategories() {
    return axios.get(ROUTES?.API?.TRIVIA?.API_CATEGORIES)
}

export function fetchQuestions(amount = 5, category, difficulty, type) {
    return axios.get(ROUTES?.API?.TRIVIA?.API_QUESTIONS, {
        params: {
            amount: amount,
            category: category,
            difficulty: difficulty,
            type: type
        }
    })
}