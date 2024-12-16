export default function Button({onClick, children, ...props}) {
    return (
        <button id={ props?.id }
                className={ `flex w-fit rounded-2xl border border-gray-300 hover:bg-gray-300 px-5 py-2 ${ props?.className ?? '' } ${ props?.disabled ? 'bg-gray-200 text-gray-400 hover:bg-gray-200 hover:cursor-default' : '' }` }
                onClick={ !props?.disabled ? onClick : () => {} }
        >
            { children }
        </button>
    )
}