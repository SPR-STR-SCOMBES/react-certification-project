import { LABELS } from '@/configs/labels'
import { useEffect } from 'react'
import Select from '@/features/quiz/components/Select'
import Button from '@/features/quiz/components/Button'
import { useQuiz } from '@/hooks/useQuiz'

export default function QuizMaker() {
    const {
        categories,
        difficulties,
        initQuizMaker,
        updateCategory,
        updateDifficulty,
        initQuestions,
        isCreationDisabled
    } = useQuiz()

    useEffect(() => {
        initQuizMaker()
    }, [])

    function handleSelectCategory(e)  {
        updateCategory(parseInt(e?.target?.value))
    }

    function handleSelectDifficulty(e)  {
        updateDifficulty(e?.target?.value)
    }

    function handleClick() {
        initQuestions()
    }

    return (
        <div className='flex flex-row gap-x-3'>
            <Select id={ LABELS?.FORMS?.MAKER?.CONTROLS?.CATEGORY?.ID }
                    dataSource={ categories?.map((category) => ({ value: category?.id, label: category?.name })) }
                    onChange={ handleSelectCategory }
                    placeholder={ LABELS?.FORMS?.MAKER?.CONTROLS?.CATEGORY?.PLACEHOLDER }
            />
            <Select id={ LABELS?.FORMS?.MAKER?.CONTROLS?.DIFFICULTY?.ID }
                    dataSource={ difficulties?.map((difficulty) => ({ value: difficulty?.VALUE, label: difficulty?.LABEL })) }
                    onChange={ handleSelectDifficulty }
                    placeholder={ LABELS?.FORMS?.MAKER?.CONTROLS?.DIFFICULTY?.PLACEHOLDER }
            />
            <Button id={ LABELS?.FORMS?.MAKER?.CONTROLS?.CREATE_BUTTON?.ID }
                    onClick={ handleClick }
                    disabled={ isCreationDisabled }
            >
                { LABELS?.FORMS?.MAKER?.CONTROLS?.CREATE_BUTTON?.TEXT }
            </Button>
    </div>
    )
}