let API = {
    TRIVIA: {
        BASE: 'https://opentdb.com/',
    },
}

API = {
    ...API,
    TRIVIA: {
        ...API?.TRIVIA,
        API_CATEGORIES: API?.TRIVIA?.BASE + 'api_category.php',
        API_QUESTIONS: API?.TRIVIA?.BASE + 'api.php',
    },
}

let FRONT = {
    BASE: '/',
}

FRONT = {
    ...FRONT,
    QUIZ_MAKER: FRONT?.BASE,
    QUIZ_RESULT: FRONT?.BASE + 'result',
}

export const ROUTES = {
    FRONT,
    API,
}