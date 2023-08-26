import React, { ReactNode } from "react"

type PrimaryButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean
    children?: ReactNode
}

export function PrimaryButton({
    onClick,
    disabled,
    children
}: PrimaryButtonProps) {
    return (
        <button
            className='
                rounded-xl px-4 py-0.5
                bg-main-petrol duration-300 enabled:hover:bg-dark-petrol
                disabled:bg-light-petrol
                text-white font-semibold
            '
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
