export default function Select({ dataSource, onChange, placeholder, ...props }) {
    return (
        <select id={ props?.id }
                className={ `flex w-fit rounded-2xl border border-gray-300 px-3 py-2 ${ props?.className ?? '' }` }
                onChange={ onChange } defaultValue={ placeholder ? -1 : undefined }
                { ...props }>
            { placeholder && <option value={ -1 } disabled>{ placeholder }</option> }
            { dataSource?.map((data, i) => (
                <option key={ i } value={ data?.value }>{ data?.label }</option>
            )) }
        </select>
    )
}