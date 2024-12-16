export default function Answer({ data }) {
    return (<div className='flex flex-col gap-1'>
        <span dangerouslySetInnerHTML={{
            __html: data?.question
        }}/>
        <div className='flex flex-row gap-3'>
            { data?.answers?.map((answer, i) => {
                const isTrue = answer.correct
                const isFalse = answer.selected && !answer.correct

                return (
                    <button key={ i }
                            className={ `flex w-fit rounded-lg border-2 px-3 py-1 ${ isFalse ? 'bg-red-200' : isTrue ? 'bg-green-200' : 'bg-white' } ${ isFalse ? 'border-red-400' : isTrue ? 'border-green-400' : '' }` }
                            dangerouslySetInnerHTML={ {
                                __html: answer?.value
                            } }
                            disabled
                    />
                )
            }) }
        </div>
    </div>)
}