import { LABELS } from '@/configs/labels'
import Answer from '@/features/quiz/components/Answer'
import Button from '@/features/quiz/components/Button'
import { useQuiz } from '@/hooks/useQuiz'
import { ROUTES } from '@/configs/routes'
import { useNavigate } from 'react-router-dom'
import Score from '@/features/quiz/components/Score'

export default function QuizResultPage() {
    const navigate = useNavigate()
    const { questions, restart } = useQuiz()

    function handleClick() {
        restart()
        navigate(ROUTES?.FRONT?.QUIZ_MAKER)
    }

    return (<>
        <div className="flex flex-col w-screen h-screen items-center gap-10">
            <h1 className="flex flex-row font-bold">{ LABELS?.TITLES?.PAGES?.RESULT }</h1>

            { questions && questions?.length > 0
                ? (
                    <div>
                        <div className="flex flex-col gap-5">
                            { questions?.map((question, i) => (
                                <Answer key={ i } data={ question }/>
                            )) }
                        </div>
                    </div>
                )
                : '' }

            <Score/>

            <Button onClick={ handleClick }>{ LABELS?.FORMS?.RESULT?.CONTROLS?.RETURN_BUTTON?.TEXT }</Button>
        </div>
    </>)
}