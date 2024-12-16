import { useDispatch, useSelector } from 'react-redux'
import QuizContext from '@/features/quiz/context/QuizContext'
import { buildCategories, buildDifficulties, buildQuestions } from '@/features/quiz/redux/quizThunks'
import { resetState, setAnswers, setCategory, setDifficulty, submit } from '@/features/quiz/redux/quizSlice'

export default function QuizProvider({ children }) {
    const dispatch = useDispatch()

    const state = useSelector((state) => state?.quiz)

    function initQuizMaker() {
        dispatch(buildCategories())
        dispatch(buildDifficulties())
    }

    function updateCategory(id) {
        dispatch(setCategory(state?.categories?.find((category) => category?.id === id)))
    }

    function updateDifficulty(id) {
        dispatch(setDifficulty(state?.difficulties?.find((difficulty) => difficulty?.VALUE === id)))
    }

    function initQuestions() {
        dispatch(buildQuestions({
            amount: 5,
            category: state?.selectedCategory?.id,
            difficulty: state?.selectedDifficulty?.VALUE,
            type: 'multiple'
        }))
    }

    function updateAnswer(question, id) {
        dispatch(setAnswers({
            id: question?.id,
            answers: question.answers?.map((answer) => (
                answer?.id === id ? { ...answer, selected: !answer?.selected } : answer
            ))
        }))
    }

    function submitAnswers() {
        dispatch(submit())
    }

    function restart() {
        dispatch(resetState())
    }

    const isCreationDisabled = !state?.selectedCategory
        || !state?.selectedDifficulty
        || (state?.questions
            && state?.questions?.length > 0)

    const isSubmissionDisabled = state?.questions && state?.questions?.length > 0
        && state?.questions
            ?.some((question) => question?.answers
                ?.every((answer) => !answer?.selected))

    const isResultAvailable = state?.submitted

    const score = {
        value: state?.questions
            ?.filter((question) => question?.answers
                ?.filter((answer) => answer?.selected)
                ?.every((answer) => answer?.correct)
            )?.length,
        max: state?.questions?.length
    }

    return (
        <QuizContext.Provider value={{ ...state, initQuizMaker, updateCategory, updateDifficulty, initQuestions, updateAnswer, submitAnswers, restart, isCreationDisabled, isSubmissionDisabled, isResultAvailable, score }}>
            { children }
        </QuizContext.Provider>
    )
}