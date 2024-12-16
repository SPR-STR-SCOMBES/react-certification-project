import Question from '@/features/quiz/components/Question'
import Button from '@/features/quiz/components/Button'
import { LABELS } from '@/configs/labels'
import { ROUTES } from '@/configs/routes'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '@/hooks/useQuiz'

export default function QuizViewer() {
    const navigate = useNavigate()
    const { questions, submitAnswers, isSubmissionDisabled } = useQuiz()

    function handleClick() {
        submitAnswers()
        navigate(ROUTES?.FRONT?.QUIZ_RESULT)
    }

    return questions && questions?.length > 0
        ? (
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-5'>
                    { questions?.map((question, i) => (
                        <Question key={ i } data={ question }/>
                    )) }
                </div>
                { !isSubmissionDisabled
                    && <div className='flex flex-row justify-center'>
                        <Button onClick={ handleClick }>{ LABELS?.FORMS?.QUIZ?.CONTROLS?.SUBMIT_BUTTON?.TEXT }</Button>
                    </div>
                }
            </div>
        )
        : ''
}