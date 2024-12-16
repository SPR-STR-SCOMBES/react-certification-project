import { useQuiz } from '@/hooks/useQuiz'

export default function Question({ data }) {
    const { updateAnswer } = useQuiz()

    function handleClick(id) {
        updateAnswer(data, id)
    }

    return (<div className='flex flex-col gap-1'>
        <span dangerouslySetInnerHTML={{
            __html: data?.question
        }}/>
        <div className='flex flex-row gap-3'>
            { data?.answers?.map((answer, i) => (
                <button key={ i } className={ `flex w-fit rounded-lg border-2 border-blue-300 px-3 py-1 hover:bg-blue-200 active:bg-blue-400 active:border-blue-800 ${ answer?.selected ? 'bg-blue-400 border-blue-800' : 'bg-white' }` }
                        dangerouslySetInnerHTML={{
                            __html: answer?.value
                        }}
                        onClick={ () => handleClick(answer?.id) }
                />
            )) }
        </div>
    </div>)
}