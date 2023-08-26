import React, { ReactNode } from "react"

type PrimaryButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    children?: ReactNode
}

export function PrimaryButton({
    onClick,
    children
}: PrimaryButtonProps) {
    return (
        <button
            className='
                rounded-xl px-4 py-0.5
                bg-main-petrol duration-300 hover:bg-dark-petrol
                text-white font-semibold
            '
            onClick={onClick}
        >
            {children}
        </button>
    )
}
