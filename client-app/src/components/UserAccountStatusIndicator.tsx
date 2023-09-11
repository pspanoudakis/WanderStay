export function UserAccountStatusIndicator(props: {
    isActive: boolean,
    className?: string
}) {
    return (
        <span 
            className={`
                ${props.className ?? ''}
                ${props.isActive ? 'text-green-700' : 'text-red-600'} font-bold text-lg
            `}
        >
        {props.isActive ? 'ΕΝΕΡΓΟΣ' : 'ΑΝΕΝΕΡΓΟΣ'}
        </span>
    );
}
