const TITLES = {
    PAGES: {
        QUIZ: 'QUIZ MAKER',
        RESULT: 'RESULTS'
    }
}

const TEXTS = {
    TEXT: {
        SCORE: ({ value, max }) => `You scored ${ value } out of ${ max }`
    },
    SELECT: {
        PLACEHOLDER: (value) => `Select ${ value ?? 'something' }`,
    },
    BUTTON: {
        CREATE: (value) => `Create ${ value ?? '' }`.trim(),
        SUBMIT: (value) => `Submit ${ value ?? '' }`.trim()
    }
}

const FORMS = {
    MAKER: {
        TITLE: TITLES?.PAGES?.QUIZ,
        CONTROLS: {
            CATEGORY: {
                ID: 'categorySelect',
                TYPE: 'SELECT',
                PLACEHOLDER: TEXTS?.SELECT?.PLACEHOLDER('a category'),
            },
            DIFFICULTY: {
                ID: 'difficultySelect',
                TYPE: 'SELECT',
                PLACEHOLDER: TEXTS?.SELECT?.PLACEHOLDER('a difficulty'),
                OPTIONS: [
                    { VALUE: 'easy', LABEL: 'Easy' },
                    { VALUE: 'medium', LABEL: 'Medium' },
                    { VALUE: 'hard', LABEL: 'Hard' },
                ]
            },
            CREATE_BUTTON: {
                ID: 'createBtn',
                TYPE: 'BUTTON',
                TEXT: TEXTS?.BUTTON?.CREATE()
            },
        },
    },
    QUIZ: {
        TITLE: TITLES?.PAGES?.QUIZ,
        CONTROLS: {
            SUBMIT_BUTTON: {
                TYPE: 'BUTTON',
                TEXT: TEXTS?.BUTTON?.SUBMIT(),
            }
        }
    },
    RESULT: {
        TITLE: TITLES?.PAGES?.RESULT,
        CONTROLS: {
            SCORE: {
                TYPE: 'TEXT',
                TEXT: TEXTS?.TEXT?.SCORE,
            },
            RETURN_BUTTON: {
                TYPE: 'BUTTON',
                TEXT: TEXTS?.BUTTON?.CREATE('a new quiz')
            }
        }
    }
}

export const LABELS = {
    TITLES,
    FORMS
}