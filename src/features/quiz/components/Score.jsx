import { useQuiz } from '@/hooks/useQuiz'
import { LABELS } from '@/configs/labels'

export default function Score() {
    const { score } = useQuiz()
    return (
        <div>
            <h1 className={ `text-lg border-2 rounded-full ${ score?.value < 2 ? 'bg-red-200 border-red-400' : score?.value < 4 ? 'bg-yellow-200 border-yellow-400' : 'bg-green-200 border-green-400' } px-3` }>{ LABELS?.FORMS?.RESULT?.CONTROLS?.SCORE?.TEXT(score) }</h1>
        </div>
    )
}