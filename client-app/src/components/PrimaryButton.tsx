import React, { ReactNode } from "react"

type PrimaryButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
    classExtras?: string,
    children?: ReactNode,
}

export function PrimaryButton({
    onClick,
    disabled,
    classExtras,
    children
}: PrimaryButtonProps) {
    return (
        <button
            type='button'
            className={`
                bg-main-petrol duration-300 enabled:hover:bg-dark-petrol
                disabled:bg-light-petrol
                text-white font-semibold
                ${classExtras ?? 'w-max rounded-xl px-4 py-0.5'}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
