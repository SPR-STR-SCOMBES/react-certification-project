import { LABELS } from '@/configs/labels'
import QuizMaker from '@/features/quiz/components/QuizMaker'
import QuizViewer from '@/features/quiz/components/QuizViewer'

export default function QuizPage() {
    return (<>
        <div className='flex flex-col w-screen h-screen items-center gap-10'>
            <h1 className='flex flex-row font-bold'>{ LABELS?.TITLES?.PAGES?.QUIZ }</h1>
            <QuizMaker/>
            <QuizViewer/>
        </div>
    </>)
}