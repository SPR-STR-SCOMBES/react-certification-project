## React : Level 2 Certification mini-project

### Préambule

Ce document a pour objectifs de présenter la solution développée, d'expliquer les “grandes étapes” réalisées et de justifier certains choix d'implémentation.

### IDE & Déploiement

Utilisateur occasionnel de Stackblitz beaucoup plus à l'aise avec IntelliJ, j'ai préféré cet IDE qui me permettait de créer un nouveau projet très rapidement. J'ai opté pour une génération avec laquelle je suis familier : Vite (sans TypeScript car le contexte professionnel dans lequel j'évolue utilise le JavaScript).

Ayant choisis mon propre IDE, j'ai également préféré publier ma solution sur un repository Github et la déployer grâce à Github Pages plutôt que de reporter mes développements dans un environnement Stackblitz.

### Dépendances

Le choix des dépendances utilisées pour ce projet a été motivé par ma compréhension du sujet et mon interprétation des fonctionnalités souhaitées ainsi que ma familiarité avec certaines librairies que j'utilise au quotidien.

*   TailwindCSS : Framework CSS mettant à disposition des classes CSS pour intégrer facilement du style au JSX. J'ai préféré ce framework à d'autres plus courants (comme Bootstrap par exemple) pour plusieurs raisons.
    *   La première : ce framework ne propose pas de composant “prédéfini” qui peuvent avoir un comportement “par défaut” géré par le framework. Dans le cadre d'une certification comme celle-ci il me semblait intéressant d'utiliser au maximum des composants “de base”.
    *   La seconde : ce framework semble monter en puissance. Sa popularité a explosée l'an dernier et le maîtriser (à défaut savoir l'utiliser) me semblait pertinent.
*   react-router-dom : Cette librairie exporte les fonctionnalités de routage de React Router en y ajoutant certains éléments compatibles avec le DOM offrant des fonctionnalités supplémentaires. J'ai préféré cette librairie pour une raison assez simple : “qui peut le plus peut le moins”. Dans ce projet, les fonctionnalités utilisées se limitent à celles présentent dans React Router mais l'utilisation de react-router-dom permet d'envisager des évolutions plus facilement.
*   Redux & Redux Toolkit : Ces packages permettent de gérer facilement et efficacement les states de l'application. Redux Toolkit permet en plus de simplifier la configuration du store et des reducers utilisés. L'utilisation de Redux ne me semblait pas obligatoire, cependant je trouvais intéressant de pouvoir centraliser la l'état de l'application et sa logique de mise à jour. Par ailleurs, préférer Redux permet à nouveau d'envisager de faire évoluer l'application plus facilement.
*   Axios : Ce client HTTP permet de gérer les appels d'API. J'ai choisis cette librairie car c'est l'une des plus connues et l'une des plus utilisées.

### Structure du projet

A la racine du projet se trouve les fichiers de configuration des outils de développement :

*   Vite : vite.config.js
*   TailwindCSS : tailwind.config.js et postcss.config.js
*   ESLint : eslint.config.js

Les sources sont structurées de la manière suivante :

```plaintext
src/
│
├── api/                                 # Répertoire contenant toutes les APIs utilisées
│   └── quiz.js                          # Exporte les appels à l'API de quizz
│
├── app/                                 # Répertoire contenant les composants "techniques" communs à toute l'application
│   ├── redux/                           # Répertoire contenant le store Redux et les éventuels middlewares
│   │   └── store.js                     # Exporte le store Redux configuré
│   │
│   ├── routing/                         # Répertoire contenant le router et les éventuelles guards
│   │   ├── guards/                      # Répertoire contenant les guards pour protéger certaines routes
│   │   │   └── resultAvailable.js       # Guard pour bloquer la route "/result" si aucun résultat n'est disponible
│   │   ├── ProtectedRoute.jsx           # Composant générique pour rediriger l'utilisateur sur une route autorisée
│   │   └── Router.jsx                   # Exporte le router (BrowserRouter) configuré
│   │
│   └── App.jsx                          # Composant permettant de centraliser les providers et le router
│
├── assets/                              # Répertoire contenant les fichiers utilisés par l'application
│
├── configs/                             # Répertoire contenant les configurations "fonctionnelles" de l'application
│   ├── labels.js                        # Exporte des constantes définissant tous les textes affichés dans l'application
│   └── routes.js                        # Exporte des constantes définissant toutes les routes utilisées dans l'application
│
├── features/                            # Répertoire contenant les différentes features présentes dans l'application
│   └── quiz/                            # Feature principale pour le quiz
│       ├── components/                  # Composants React réutilisables de la feature
│       │   ├── Answer.jsx
│       │   ├── Button.jsx
│       │   ├── Question.jsx
│       │   ├── QuizMaker.jsx
│       │   ├── QuizViewer.jsx
│       │   ├── Score.jsx
│       │   └── Select.jsx
│       │
│       ├── context/                     # Context et provider de la feature
│       │   ├── QuizContext.jsx          # Exporte le contexte
│       │   └── QuizProvider.jsx         # Exporte le provider
│       │
│       ├── pages/                       # Composants utilisés comme conteneurs (pour le router)
│       │   ├── QuizPage.jsx
│       │   └── QuizResultPage.jsx
│       │
│       └── redux/                       # Reducers et thunks de la feature
│           ├── quizSlice.js
│           └── quizThunks.js
│
├── hooks/                               # Répertoire contenant les hooks personnalisés
│   └── useQuiz.js                       # Hook personnalisé pour interagir avec le context du quiz
│
├── utils/                               # Répertoire contenant les classes/méthodes utilitaires
│   └── common.js                        # Méthodes utilitaires communes (ex : shuffle)
│
├── index.css                            # Feuille de style globale (inclut les variables TailwindCSS)
└── index.jsx                            # Point d'entrée de l'application  
```

### Le Router

Le Router expose 2 routes :

*   “/” permettant d'accéder au quizz
*   “/result” permettant d'accéder à la page de résultat

La seconde route est “protégée” par un mécanisme de garde implémenté dans le composant ProtectedRoute :

```javascript
 export default function ProtectedRoute({ guard, children, fallback = ROUTES?.FRONT?.BASE }) {
    const params = useParams()
    const [isAllowed, setIsAllowed] = useState(null)

    useEffect(() => {
        guard(params).then((isAllowed) => setIsAllowed(isAllowed))
    }, [guard, params])


    return isAllowed === null
        ? (<>Chargement...</>)
        : isAllowed
            ? children ?? <Outlet/>
            : <Navigate to={ fallback } replace/>
}
```

Ce composant utilise une fonction qui approuve ou non l'affichage du composant protégé. Cette fonction retourne une Promise pour permettre une validation asynchrone (ex : appel à une API d'authentification) de la route.

*   Tant que la Promise n'est pas résolue, la route affiche “Chargement…”
*   Si la Promise retourne “true” alors l'élément est affiché.
*   Si la Promise retourne “false” alors la route redirige vers la route fallback spécifiée

Exemple d'utilisation :

```javascript
<Route path={ ROUTES?.FRONT?.QUIZ_RESULT } element={
    <ProtectedRoute guard={ resultAvailableGuard(isResultAvailable) } fallback={ ROUTES?.FRONT?.QUIZ_MAKER }>
        <QuizResultPage/>
    </ProtectedRoute>
}/>
```

Pour que ce composant soit réutilisable dans d'autres circonstances, il retourne un \<Outlet/> lorsqu'il est utilisé comme élément d'une route englobant d'autres routes. Exemple d'utilisation :

```javascript
<Route element={ <ProtectedRoute guard={ authGuard(!isAuthenticated) } fallback={ ROUTES?.FRONT?.PROFILE }/> }>
    <Route path={ ROUTES?.FRONT?.REGISTER } element={ <RegisterPage/> }/>
    <Route path={ ROUTES?.FRONT?.LOGIN } element={ <LoginPage/> }/>
    <Route path={ ROUTES?.FRONT?.RECOVERY } element={ <RecoveryPage/> }/>
</Route>
```

Ainsi les routes permettant d'accéder aux pages d'inscription, de connexion et de récupération de mot de passe sont toutes les 3 protégées par une garde empêchant un utilisateur authentifié d'y accéder.

### Le Store

Le sotre Redux de l'application est relativement simple, il ne possède qu'un reducer : "quiz" qui permet de maintenir l'état lié à la feature “quiz”. Cependant sa configuration utilise un reducer “global” utilisant la méthode combineReducers() de sorte que l'ajout d'un nouveau reducer soit simplifié au maximum :

```javascript
import { quizReducer } from '@/features/quiz/redux/quizSlice'

const rootReducer = combineReducers({
    quiz: quizReducer
})

export const store = configureStore({
    reducer: rootReducer,
})
```

### L'API Quiz

L'API Quiz exporte 2 méthodes qui utilisent Axios pour réaliser les appels à l'API et retourne une Promise avec la réponse de l'appel :

*   fetchCategories() : qui retourne l'ensemble des catégories
*   fetchQuestions(amount = 5, category, difficulty, type = ‘multiple’) : qui retourne un ensemble de questions filtrées par catégorie, difficulté et type

> A noter que amount et type ont comme valeurs par défaut 5 et ‘multiple’ car le sujet indiquait d'utiliser ces valeurs mais l'implémentation actuelle permet de surcharger ces valeurs et d'obtenir un quizz avec plus de questions ou des questions d'un autre type sans avoir à redévelopper cette méthode.

### Les configurations

Les configurations labels.js et routes.js exportent toutes les deux des constantes utilisées à travers toute l'application. Elles permettent de centraliser en un seul et même endroit des valeurs réutilisées dans différents composants. De cette manière si un route doit changer, il suffira de modifier sa valeur dans le fichier routes.js pour que changement opère partout où elle est utilisée. Il en est de même pour les labels pour lesquels l'utilisation d'un fichier de configuration permet en plus d'avoir une uniformité dans les textes affichés à l'écran

### La feature Quiz

#### Reducers & Thunks

Le reducer “quiz” permet de maintenir l'état de la feature à travers les différentes pages de l'application. L'intérêt ici et de pouvoir centraliser toutes les actions liées à un “quiz” (récupération des catégories, initialisation du quizz, modification de la catégorie ou de la difficulté, saisie d'une réponse, etc) et de savoir que toute la logique “métier” liée au quizz se trouve ici. 

Le state initial possède donc la structure suivante :

```javascript
const initialState = {
    categories: [],
    difficulties: [],
    selectedCategory: null,
    selectedDifficulty: null,
    questions: [],
    submitted: false,
}
```

Il définit les listes de catégories et de difficultés permettant d'alimenter les listes déroulantes, la catégorie et la difficulté sélectionnée ainsi que la liste des questions générées et enfin un top permettant de savoir si le quizz a été soumis ou non.

Par défaut, toutes les listes sont vides, les valeurs nulles et le formulaire non soumis.

> La liste des difficultés aurait pu être alimentée ici puisque les valeurs utilisées sont “en dur”. Cependant pour uniformiser l'alimentation de cette liste avec celle des catégories j'ai préféré simuler un “appel d'API”. Par ailleurs, si une évolution permet un jour de récupérer les niveaux disponibles puis la même API que les catégories alors à nouveau les modifications à réaliser seront mineures.

Les actions mise à disposition permettent de mettre à jour des parties spécifiques du state :

*   Modifier la catégorie sélectionnée
*   Modifier la difficulté sélectionnée
*   Modifier les réponses sélectionnées pour une question
*   Soumettre le quizz
*   Réinitialiser l'état du quizz

En plus de ces actions, des thunks permettent de charger les données de manière asynchrone :

*   Chargement des catégories
*   Chargement des difficultés
*   Chargement des questions

Ces thunks sont définis dans le fichier quizThunks :

*   buildCategories : utilise la méthode fetchCategories() exposée par l'API quiz présentée précédemment
*   buildDifficulties : retourne une Promise contenant la liste des difficultés. Cette liste est définie comme une constante dans le fichier de configuration labels.js. De cette manière : si les données restent “en dur”, une simple modification de la configuration permet de mettre à jour les difficultés, si les données peuvent être récupérées depuis une API, il suffira d'enrichir l'API quiz et d'utiliser ce nouvel appel mais il n'y aura pas d'impact du côté du reducer
*   buildQuestions : utilise la méthode fetchQuestions() exposée par l'API quiz présentée précédemment

Lorsque les questions sont chargées, le reducer opère une légère modification sur les données retournées par l'API :

```javascript
addCase(buildQuestions.fulfilled, (state, action) => {
    return {
        ...state,
        questions: action?.payload?.map((question, i) => ({
            ...question,
            id: i,
            answers: shuffle([ question.correct_answer, ...question.incorrect_answers ])?.map((answer, i) => ({
                id: i,
                value: answer,
                selected: false,
                correct: answer === question.correct_answer
            }))
        }))
    }
})
```

*   un “id” est rajouté à chaque question pour pouvoir l'identifier plus facilement
*   un tableau “answers” est rajouté à chaque question, ce tableau contient l'ensemble des réponses (correcte et incorrectes) mélangé
    *   les réponses sont enrichies avec les propriétés suivantes :
        *   un “id” pour identifier la réponse au sein de la question
        *   une “value” qui contient la valeur de la réponse
        *   un top “selected” pour déterminer si la réponse est sélectionnée ou non
        *   un top “correct” pour déterminer si la réponse est correcte ou non

De cette manière il est plus facile de manipuler les questions et les réponses pour mettre à jour l'état global du quizz lorsque l'utilisateur répond au quizz.

#### Context & Provider

Dans le cadre de ce mini-projet le state décrit précédemment est commun à toutes les pages de l'application. Utiliser un reducer me semblait donc intéressant pour centraliser sa logique et sa gestion. En l'intégrant à un context (global à toute l'application) et en utilisant un provider pour exposer certaines actions du reducer, cela me permettait à nouveau de centraliser la logique à un seul endroit.

QuizContext.jsx

```javascript
const QuizContext = createContext(undefined)

export default QuizContext
```

QuizProvider.jsx

```javascript
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
            category: state?.selectedCategory?.id,
            difficulty: state?.selectedDifficulty?.VALUE
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
```

De cette manière, le QuizProvider est le seul composant capable de dispatcher des actions du reducer, les composants React et les pages définis dans la feature feront appel aux méthodes qu'il fournit et accèderont aux parties du state qu'il expose.

#### Hook

Pour cela, le hook useQuiz() exporte le context du quiz et permet aux composant qui l'utilisent d'accéder aux méthodes fournies par le provider.

#### Pages & Components

La feature est découpée en 2 pages :

*   QuizPage : affiche le “bandeau” permettant de choisir une catégorie et une difficulté pour créer un quizz et affiche le quizz s'il est créé
*   QuizResultPage : affiche le résultat du quizz

Ces pages utilisent des composants définis dans le répertoire components de la feature. Notamment pour la page QuizPage :

*   QuizMaker : définit le “bandeau” permettant de créer le quizz
*   QuizViewer : définit la liste des questions affichées

D'autres composants réutilisés plusieurs fois permettent de simplifier et d'alléger le code de leurs parents :

*   Select : liste déroulante utilisée pour afficher les catégories et les niveaux de difficulté
*   Button
*   Question : représente une question lors du remplissage du quizz avec sa phrase et ses réponses possibles sous forme de boutons
*   Answer : représente une question lors de l'affichage du résultat avec sa phrase et ses réponses stylisées selon leur état (correcte/incorrecte)
*   Score : affiche le score de l'utilisateur sur l'écran de resultat